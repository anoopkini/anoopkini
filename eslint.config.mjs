import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
  {
    ignores: ['.next/**', '.contentlayer/**', 'old-app/**', 'old-components/**'],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
]

export default config
