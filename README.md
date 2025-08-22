# React Component Development Assignment

This repo contains two reusable components built with **React + TypeScript + TailwindCSS**, documented in **Storybook**, and covered by basic tests using **Vitest + Testing Library**.

## Components
- **InputField**: Label, placeholder, helper/error, states (disabled/invalid/loading), variants (filled/outlined/ghost), sizes (sm/md/lg), optional clear button, password toggle, light/dark-ready.
- **DataTable**: Tabular display, sortable columns, row selection (multi-select), loading overlay, empty state.

## Tech
- Vite (React + TS)
- TailwindCSS
- Storybook (React + Vite)
- Vitest + Testing Library

## Getting Started
```bash
pnpm i           # or npm i / yarn
pnpm dev         # start Vite dev server
pnpm storybook   # start Storybook
pnpm test        # run tests
```

## File Structure
```text
.storybook/            # storybook config
src/
  components/
    DataTable/
      DataTable.tsx
      DataTable.test.tsx
    InputField/
      InputField.tsx
      InputField.test.tsx
  App.tsx              # demo usage
  main.tsx
  index.css
stories/
  DataTable.stories.tsx
  InputField.stories.tsx
tailwind.config.ts
postcss.config.js
vite.config.ts
tsconfig.json
```

## Accessibility
- InputField uses `aria-invalid`, `aria-describedby`.
- DataTable uses `aria-sort`, labeled checkboxes for selection.
- Keyboard-friendly controls (buttons/checkboxes).

## Deployment
- **Chromatic**: Connect your GitHub repo on https://www.chromatic.com/, add a project token, then:
  ```bash
  npx chromatic --project-token=<your-token>
  ```
- **Vercel** (Storybook): Use the `build-storybook` script to generate `storybook-static` and import the project on Vercel.

## Notes
- Tailwind dark mode is class-based (`dark`). Toggle a parent `.dark` class to preview dark styles.
- Sorting cycles: Asc → Desc → Off.
- Row selection emits `onRowSelect` with the current selected rows.
## Local Development

This project uses Vite + React.

**Run locally**
```bash
npm install
npm start        # or: npm run dev
```

**Build for production**
```bash
npm run build
npm run preview  # serves the built files locally
```

**Storybook**
```bash
npm run storybook
```
