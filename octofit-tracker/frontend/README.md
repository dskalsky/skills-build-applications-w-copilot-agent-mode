# Octofit Tracker frontend

React 19 presentation tier for Octofit Tracker. It uses React Router for the
activities, leaderboard, teams, users, and workouts views, and Bootstrap for
layout and styling.

## API requests

The frontend requests `/api/` endpoints on the same origin. During development,
Vite proxies those requests to the backend on port `8000`, so no Codespaces API
URL configuration or cross-origin browser access is required.

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
