# VIN Decoder

A single-page web app that decodes vehicle VIN codes using the public [NHTSA vPIC API](https://vpic.nhtsa.dot.gov/api/).

**Live demo:** https://illiaromanuk.github.io/decoder/#/

## Features

- Decode a VIN and see all variables that have a value (`Variable` / `Value`).
- Form validation: the field must not be empty, at most 17 characters, only Latin letters and digits (I, O and Q are not allowed).
- Validation errors and the `Message` returned by the API are shown in the UI.
- History of the three most recent VINs (stored in `localStorage`); click one to decode it again.
- `/variables` - list of all API variables with short descriptions.
- `/variables/:id` - full description of a single variable (HTML from the API is sanitized with DOMPurify).
- Responsive, semantic, framework-free CSS (works from 420 px to 1440 px), light/dark theme.

## Tech stack

React 19, TypeScript, Vite, React Router (HashRouter, so it works on GitHub Pages), TanStack Query, Axios, DOMPurify, ESLint, Prettier.

## Run locally

```bash
git clone https://github.com/IlliaRomanuk/decoder.git
cd decoder
npm install
npm run dev
```

The app will be available at http://localhost:5173/decoder/.

Other scripts: `npm run build`, `npm run preview`, `npm run lint`, `npm run format`, `npm run deploy` (publishes `dist` to the `gh-pages` branch).

## Project structure

```
src/
├── components/   Header, Aside, DecoderInput, DecoderHistory, Results
├── hooks/        useDecodeVIN, useVinHistory, useVariables, useTheme
├── pages/        Home, Variables, VariableDetails, NotFound
├── services/     api.ts - NHTSA API client
├── types/        API and domain types
└── utils/        VIN validation, HTML helpers
```
