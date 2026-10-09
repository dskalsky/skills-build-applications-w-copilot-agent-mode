import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [
      {
        name: { type: String, required: true },
        durationMinutes: { type: Number, min: 0 },
        repetitions: { type: Number, min: 0 },
      },
    ],
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
