import { Schema, model } from "mongoose";

const MoodSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
  rating: { type: Number, min: 1, max: 5, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default model('Mood', MoodSchema);
