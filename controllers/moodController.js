import Mood from '../models/Mood.js';

export const getMoods = async (req, res) => {
  const moods = await Mood.find();
  res.json(moods);
};

export const createMood = async (req, res) => {
  const newMood = new Mood(req.body);
  await newMood.save();
  res.status(201).json(newMood);
};

export const updateMood = async (req, res) => {
  const mood = await Mood.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(mood);
};

export const deleteMood = async (req, res) => {
  await Mood.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
