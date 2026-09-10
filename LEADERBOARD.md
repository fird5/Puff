# Puff trivia leaderboard

Nickname only. No login.

Scores live in Postgres table `quiz_scores`.
They persist across visitors only when `DATABASE_URL` is set.

## Vercel

1. Create a Neon (or any Postgres) database.
2. In the Puff Vercel project: Settings → Environment Variables.
3. Add `DATABASE_URL` for Production (and Preview if you want those boards too).
4. Redeploy.

`npm run build` already runs `npm run db:migrate`.

## VPS

```bash
export DATABASE_URL="postgres://user:pass@127.0.0.1:5432/puff"
npm ci
npm run build
node .output/server/index.mjs
```

Keep the same `DATABASE_URL` on every restart.

Without that variable the app uses in-memory PGLite and the board resets.
