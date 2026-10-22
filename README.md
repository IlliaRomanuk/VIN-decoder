# VIN Decoder

A single-page web app that decodes vehicle VIN codes using the public [NHTSA vPIC API](https://vpic.nhtsa.dot.gov/api/).

**Live demo:** https://illiaromanuk.github.io/VIN-decoder/

## Features

- Decode a VIN and see every variable that has a value (`Variable` / `Value`).
- Form validation: the field must not be empty, at most 17 characters, only Latin letters and digits (I, O and Q are not allowed).
- Validation errors and the `Message` returned by the API are shown in the UI.
- History of the three most recent VINs (stored in `localStorage`); click one to decode it again.
- `/variables` - list of all API variables with their full descriptions.
- `/variables/:id` - description of a single variable.
- HTML descriptions from the API are sanitized with DOMPurify before rendering.
- 404 page for unknown routes.
- Responsive, semantic, framework-free CSS (works from 420 px to 1440 px), accessible form (label, Enter to submit, announced errors), light/dark theme.

## Tech stack

React 19, TypeScript, Vite, React Router (HashRouter, so it works on GitHub Pages), TanStack Query, Axios, DOMPurify, ESLint, Prettier, GitHub Actions.

## Run locally

Requires Node.js 22 (the version used in CI).

```bash
git clone https://github.com/IlliaRomanuk/decoder.git
cd decoder
npm install
npm run dev
```

The app will be available at http://localhost:5173/decoder/.

Other scripts: `npm run build`, `npm run preview`, `npm run lint`, `npm run format`.

## Deployment

The site is built and published to GitHub Pages by the GitHub Actions workflow in `.github/workflows/deploy.yml` on every push to `main`. Routes use a hash (for example `/#/variables`), so deep links work on GitHub Pages. The Vite `base` path is `/decoder/` and must match the repository name.

## Project structure

```
.github/workflows/   GitHub Pages deploy workflow
src/
├── components/      Header, Aside, DecoderInput, DecoderHistory, Results
├── hooks/           useDecodeVIN, useVinHistory, useVariables, useTheme
├── pages/           Home, Variables, VariableDetails, NotFound
├── services/        api.ts - NHTSA API client
├── types/           API and domain types
└── utils/           VIN validation, HTML helpers
```