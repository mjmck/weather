## Weather App

A modern weather dashboard built with the Next.js App Router.  
You can search for a location and see the current conditions (temperature, icon, humidity, wind, UV, etc.).

## Features

- **Location search**: Type a city or place name into the search bar to fetch live weather.

## Tech stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript / React
- **Styling**: Tailwind CSS (via the new `@import "tailwindcss";` setup)

## Environment variables

Create a `.env.local` file in the project root with:

```bash
API_KEY=your_weather_api_key_here
API_URL=http://api.weatherapi.com/v1
```

The `/api/weather` route reads these values to call the external weather API.  

## Getting started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```
