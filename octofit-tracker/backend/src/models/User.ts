import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    displayName: { type: String, required: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    totalPoints: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export default model('User', userSchema);
