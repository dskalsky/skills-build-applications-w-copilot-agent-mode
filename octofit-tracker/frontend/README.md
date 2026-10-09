# Octofit Tracker frontend

React 19 presentation tier for Octofit Tracker. It uses React Router for the
activities, leaderboard, teams, users, and workouts views, and Bootstrap for
layout and styling.

## API requests

The frontend builds API URLs from `VITE_CODESPACE_NAME`. In Codespaces, define
it as the Codespace name (without the port or hostname suffix) in
`octofit-tracker/frontend/.env.local`; API requests then use
`https://<VITE_CODESPACE_NAME>-8000.app.github.dev`. If it is unset, requests
fall back to `http://localhost:8000`.

## Development

From the repository root, run:

```bash
npm run dev --prefix octofit-tracker/frontend
```

The Vite development server uses port `5173`. Build and lint with:

```bash
npm run build --prefix octofit-tracker/frontend
npm run lint --prefix octofit-tracker/frontend
```
