import express, { type ErrorRequestHandler } from 'express';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';

const app = express();

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().lean());
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().lean());
});

app.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().lean());
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().sort({ rank: 1 }).lean());
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().lean());
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error('API request failed:', error);
  if (response.headersSent) {
    return;
  }
  response.status(500).json({ error: 'Internal server error' });
};

app.use(errorHandler);

export { app };
