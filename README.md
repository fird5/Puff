# Puff

Singapore air quality for the region you are in, plus a growing cloud pal and SEA trivia.

- Live **24-hour PSI** and 1-hour PM2.5 from [data.gov.sg](https://data.gov.sg) (NEA)
- Pick a region or use your location
- **Should you…** plus three quick advice slots that change with the band
- **SEA trivia**: 5–8 questions per round on Singapore and the neighbourhood, new mix every deal, shared leaderboard
- Puff grows cuter as you finish rounds

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (port 8080).

## Stack

TanStack Start, React 19, Tailwind v4. Trivia scores persist in Postgres (Neon in production, PGLite in local preview).
