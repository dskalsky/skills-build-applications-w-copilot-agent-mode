import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    await connectDatabase();

    const teams = await Promise.all([
      Team.findOneAndUpdate(
        { name: 'Trailblazers' },
        {
          $set: {
            description: 'A team that loves running outdoors and building endurance.',
            totalPoints: 410,
          },
        },
        { returnDocument: 'after', upsert: true, runValidators: true },
      ),
      Team.findOneAndUpdate(
        { name: 'Pulse Crew' },
        {
          $set: {
            description: 'A balanced team focused on strength, mobility, and cardio.',
            totalPoints: 345,
          },
        },
        { returnDocument: 'after', upsert: true, runValidators: true },
      ),
    ]);

    const teamByName = new Map(teams.map((team) => [team.name, team]));
    const userData = [
      {
        username: 'alex.morgan',
        email: 'alex.morgan@example.com',
        displayName: 'Alex Morgan',
        teamName: 'Trailblazers',
        totalPoints: 230,
      },
      {
        username: 'jamie.chen',
        email: 'jamie.chen@example.com',
        displayName: 'Jamie Chen',
        teamName: 'Trailblazers',
        totalPoints: 180,
      },
      {
        username: 'riley.patel',
        email: 'riley.patel@example.com',
        displayName: 'Riley Patel',
        teamName: 'Pulse Crew',
        totalPoints: 195,
      },
      {
        username: 'sam.taylor',
        email: 'sam.taylor@example.com',
        displayName: 'Sam Taylor',
        teamName: 'Pulse Crew',
        totalPoints: 150,
      },
    ];

    const users = await Promise.all(
      userData.map(async ({ teamName, ...user }) => {
        const team = teamByName.get(teamName);
        if (!team) {
          throw new Error(`Unable to find seeded team "${teamName}"`);
        }

        return User.findOneAndUpdate(
          { username: user.username },
          { $set: { ...user, team: team._id } },
          { returnDocument: 'after', upsert: true, runValidators: true },
        );
      }),
    );

    await Promise.all(
      teams.map((team) =>
        Team.updateOne(
          { _id: team._id },
          {
            $set: {
              members: users
                .filter((user) => user.team?.equals(team._id))
                .map((user) => user._id),
            },
          },
        ),
      ),
    );

    const activities = [
      {
        username: 'alex.morgan',
        activityType: 'run',
        durationMinutes: 42,
        distanceKm: 7.2,
        points: 90,
        performedAt: new Date('2026-10-06T07:30:00.000Z'),
      },
      {
        username: 'alex.morgan',
        activityType: 'strength',
        durationMinutes: 35,
        points: 60,
        performedAt: new Date('2026-10-08T17:15:00.000Z'),
      },
      {
        username: 'jamie.chen',
        activityType: 'cycle',
        durationMinutes: 55,
        distanceKm: 18.5,
        points: 80,
        performedAt: new Date('2026-10-07T16:00:00.000Z'),
      },
      {
        username: 'riley.patel',
        activityType: 'yoga',
        durationMinutes: 40,
        points: 55,
        performedAt: new Date('2026-10-08T06:45:00.000Z'),
      },
      {
        username: 'riley.patel',
        activityType: 'run',
        durationMinutes: 30,
        distanceKm: 4.8,
        points: 70,
        performedAt: new Date('2026-10-09T06:30:00.000Z'),
      },
      {
        username: 'sam.taylor',
        activityType: 'strength',
        durationMinutes: 45,
        points: 65,
        performedAt: new Date('2026-10-07T18:00:00.000Z'),
      },
    ] as const;

    const usersByUsername = new Map(users.map((user) => [user.username, user]));
    await Promise.all(
      activities.map(async ({ username, ...activity }) => {
        const user = usersByUsername.get(username);
        if (!user) {
          throw new Error(`Unable to find seeded user "${username}"`);
        }

        await Activity.findOneAndUpdate(
          {
            user: user._id,
            activityType: activity.activityType,
            performedAt: activity.performedAt,
          },
          { $set: { ...activity, user: user._id } },
          { returnDocument: 'after', upsert: true, runValidators: true },
        );
      }),
    );

    const leaderboardEntries = [
      { username: 'alex.morgan', points: 230, rank: 1 },
      { username: 'riley.patel', points: 195, rank: 2 },
      { username: 'jamie.chen', points: 180, rank: 3 },
      { username: 'sam.taylor', points: 150, rank: 4 },
    ];

    await Promise.all(
      leaderboardEntries.map(async ({ username, points, rank }) => {
        const user = usersByUsername.get(username);
        if (!user) {
          throw new Error(`Unable to find seeded user "${username}"`);
        }

        await Leaderboard.findOneAndUpdate(
          { user: user._id, period: 'weekly' },
          {
            $set: {
              user: user._id,
              team: user.team,
              points,
              rank,
              period: 'weekly',
            },
          },
          { returnDocument: 'after', upsert: true, runValidators: true },
        );
      }),
    );

    const workouts = [
      {
        name: 'Beginner Full-Body Strength',
        description: 'A steady introduction to foundational strength movements.',
        category: 'strength',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: [
          { name: 'Bodyweight squats', repetitions: 12 },
          { name: 'Incline push-ups', repetitions: 10 },
          { name: 'Glute bridges', repetitions: 15 },
        ],
      },
      {
        name: 'Tempo Run Builder',
        description: 'A progressive run to improve cardiovascular endurance.',
        category: 'running',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: [
          { name: 'Easy warm-up', durationMinutes: 10 },
          { name: 'Tempo intervals', durationMinutes: 20 },
          { name: 'Easy cool-down', durationMinutes: 10 },
        ],
      },
      {
        name: 'Post-Workout Mobility',
        description: 'A calming mobility flow for hips, shoulders, and back.',
        category: 'mobility',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: [
          { name: "World's greatest stretch", durationMinutes: 5 },
          { name: 'Seated spinal twist', durationMinutes: 5 },
          { name: 'Shoulder and chest opener', durationMinutes: 10 },
        ],
      },
    ];

    await Promise.all(
      workouts.map(({ name, ...workout }) =>
        Workout.findOneAndUpdate(
          { name },
          { $set: { name, ...workout } },
          { returnDocument: 'after', upsert: true, runValidators: true },
        ),
      ),
    );

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

void seedDatabase();
