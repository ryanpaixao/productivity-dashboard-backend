import mongoose from "mongoose";

const MoodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  rating: { type: Number },
  entryDate: { type: Date }
});

export default mongoose.model('Mood', MoodSchema);
