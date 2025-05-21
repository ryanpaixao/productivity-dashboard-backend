import { Schema, model } from "mongoose";

const MoodSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
  rating: { type: Number },
  creationDateTime: { type: Date }
});

export default model('Mood', MoodSchema);
