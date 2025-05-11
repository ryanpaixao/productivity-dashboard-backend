import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
  title: { type: String, required: true},
  completed: { type: Boolean, default: false},
  entryDate: { type: Date }
});

export default model('Task', TaskSchema);
