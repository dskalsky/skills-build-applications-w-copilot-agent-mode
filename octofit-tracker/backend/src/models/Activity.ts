import { Schema, Types, model } from 'mongoose';

interface ActivityDocument {
  user: Types.ObjectId;
  activityType: 'run' | 'cycle' | 'swim' | 'strength' | 'yoga' | 'other';
  durationMinutes: number;
  distanceKm?: number;
  points: number;
  performedAt: Date;
}

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: {
      type: String,
      enum: ['run', 'cycle', 'swim', 'strength', 'yoga', 'other'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    points: { type: Number, default: 0, min: 0 },
    performedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default model<ActivityDocument>('Activity', activitySchema);
