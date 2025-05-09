import mongoose from "mongoose";

const HabitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  title: { type: String, required: true},
  completed: { type: Boolean, default: false},
  entryDate: { type: Date }
});

export default mongoose.model('Habit', HabitSchema);
