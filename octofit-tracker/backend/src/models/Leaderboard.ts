import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: {
      type: String,
      enum: ['daily', 'weekly', 'all-time'],
      default: 'weekly',
    },
  },
  { timestamps: true },
);

export default model('Leaderboard', leaderboardSchema);
