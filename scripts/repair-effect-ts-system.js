const fs = require('fs');
const path = require('path');

// Temporary install-time workaround for broken ESM export paths in the
// @effect-ts packages currently pulled in by contentlayer2. We generate
// local ESM wrappers around the published CommonJS entrypoints so
// contentlayer2 can load during Next.js build/dev. Remove this once the
// upstream packages publish compatible ESM exports again.

const scopeDir = path.join(process.cwd(), 'node_modules', '@effect-ts');
const reservedWords = new Set([
  'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
  'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for', 'function',
  'if', 'import', 'in', 'instanceof', 'new', 'null', 'return', 'super', 'switch', 'this',
  'implements', 'interface', 'let', 'package', 'private', 'protected', 'public', 'static',
  'throw', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield',
]);

if (!fs.existsSync(scopeDir)) {
  process.exit(0);
}

for (const packageName of fs.readdirSync(scopeDir)) {
  const packageDir = path.join(scopeDir, packageName);
  const packageJsonPath = path.join(packageDir, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    continue;
  }

  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  let changed = false;

  for (const [exportKey, exportValue] of Object.entries(pkg.exports ?? {})) {
    if (
      !exportValue ||
      typeof exportValue !== 'object' ||
      typeof exportValue.require !== 'string'
    ) {
      continue;
    }

    const requireFile = path.join(packageDir, exportValue.require);

    if (!fs.existsSync(requireFile)) {
      continue;
    }

    const wrapperRelativePath =
      exportKey === '.'
        ? './_codex_esm/index.mjs'
        : `./_codex_esm/${exportKey.slice(2)}/index.mjs`;
    const wrapperFile = path.join(packageDir, wrapperRelativePath);
    const relativeRequireFile = path
      .relative(path.dirname(wrapperFile), requireFile)
      .replace(/\\/g, '/');
    const requireSpecifier = relativeRequireFile.startsWith('.')
      ? relativeRequireFile
      : `./${relativeRequireFile}`;

    let exportNames = [];

    try {
      const mod = require(requireFile);
      exportNames = Object.keys(mod).filter((key) => key !== '__esModule' && key !== 'default');
    } catch {
      continue;
    }

    const lines = [
      "import { createRequire } from 'module';",
      '',
      'const requireFn = createRequire(import.meta.url);',
      `const mod = requireFn('${requireSpecifier}');`,
      '',
      'export default mod;',
    ];

    for (const exportName of exportNames) {
      if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(exportName)) {
        if (reservedWords.has(exportName)) {
          const localName = `__codex_export_${exportName}`;
          lines.push(`const ${localName} = mod[${JSON.stringify(exportName)}];`);
          lines.push(`export { ${localName} as ${exportName} };`);
        } else {
          lines.push(`export const ${exportName} = mod.${exportName};`);
        }
      }
    }

    if (!lines.some((line) => line.startsWith('export const '))) {
      lines.push('export {};');
    }

    lines.push('');

    fs.mkdirSync(path.dirname(wrapperFile), { recursive: true });
    fs.writeFileSync(wrapperFile, lines.join('\n'), 'utf8');

    exportValue.import = wrapperRelativePath;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
  }
}
