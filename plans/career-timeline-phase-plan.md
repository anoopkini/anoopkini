# Phase 1 Implementation Plan: Career Timeline

## Summary
Implement a fully functional first version of the career timeline as a dedicated `/career` page in `anoopkini`, powered by Contentlayer and Markdown files. Phase 1 will include the content model, timeline listing UI, sorting, date rendering, and navbar entry. Inline expansion and URL-driven open state remain for Phase 2.

Planned plan file path once execution is allowed: `anoopkini/plans/career-timeline-phase-plan.md`

## Implementation Changes
- Extend `contentlayer.config.ts` to support a new `CareerEntry` document type alongside `Post`.
- Store timeline entries in a dedicated content folder such as `career/`, with one Markdown file per item.
- Define frontmatter for Phase 1 as:
  - `title`
  - `summary`
  - `start`
  - `end` optional
  - `type` with values `job | education`
- Add computed fields for a stable slug and any route-safe identifier needed later.
- Create a new `/career` page under the App Router that:
  - loads all `CareerEntry` items from Contentlayer
  - sorts by `start` date descending
  - renders compact cards with title, summary, type, and date range
  - shows `Present` when `end` is omitted
- Add a `Career` link to the global navbar.
- Create 2-3 starter Markdown entries so the page is functional immediately and demonstrates both `job` and `education`.

## UI Behavior for Phase 1
- Timeline page is standalone and complete without inline expansion.
- Each card shows only summary-level information:
  - title
  - short summary
  - date range
  - type badge or label
- Overlapping work and education are represented by date sorting only; no lane-based layout in Phase 1.
- The layout should reuse the site’s current Tailwind/daisyUI approach and remain readable inside the existing prose-based page shell.

## Test Plan
- `contentlayer` generation succeeds with both document types enabled.
- `/career` renders all Markdown-driven entries.
- `job` and `education` entries both display correctly.
- Missing `end` renders `Present`.
- Entries are sorted by descending `start`.
- Navbar includes `Career` and links to `/career`.
- The page works on both desktop and mobile without visual breakage.

## Assumptions and Defaults
- Content lives in a new top-level folder dedicated to career entries rather than mixing with `posts`.
- `summary` is explicit frontmatter, not derived from the Markdown body.
- Phase 1 does not include card click behavior, inline reveal, or URL query state.
- Phase 2 will build on the same `CareerEntry` content shape so no Phase 1 content migration should be needed.
