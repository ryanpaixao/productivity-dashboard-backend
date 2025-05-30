import { Schema } from 'mongoose';

export type MoodEntry = {
  userId: Schema.Types.ObjectId;
  createdAt: string | Date; // Can be ISO string or Date object
  rating: number;
};
