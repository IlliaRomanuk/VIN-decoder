# VIN Decoder

VIN Decoder is a Single Page Application (SPA) built with React and TypeScript that allows users to decode vehicle VIN numbers using the NHTSA API.

## Live Demo

🔗 https://illiaromanuk.github.io/VIN-decoder/

## Features

- Decode any valid 17-character VIN
- VIN validation before sending a request
- Display decoded vehicle information
- Show API response message
- Store the last 3 decoded VINs in Local Storage
- Quickly decode VINs from history
- Browse all available vehicle variables
- View detailed information for each variable
- Responsive layout (420px – 1440px)

## Technologies

- React
- TypeScript
- React Router
- TanStack Query (React Query)
- Axios
- CSS

## API

This project uses the NHTSA Vehicle API:

- Decode VIN: `/vehicles/decodevin/${vin}?format=json`
- Vehicle Variables: `/vehicles/getvehiclevariablelist?format=json`

Base URL: https://vpic.nhtsa.dot.gov/api

https://vpic.nhtsa.dot.gov/api/

## Project Structure

```
src/
│
├── components/
├── hooks/
├── pages/
├── services/
├── type/
├── assets/
│
├── App.tsx
├── Layout.tsx
└── main.tsx
```

## Installation

Clone the repository

```bash
git clone https://github.com/IlliaRomanuk/VIN-decoder
```

Go to the project folder

```bash
cd vin-decoder
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Open

```
http://localhost:5173
```

## Build

```bash
npm run build
```

## Author

Illia
