import Mood from '../models/Mood.js';

// Get all Moods
export const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find();
    res.status(200).json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new Mood
export const createMood = async (req, res) => {
  try {
    const newMood = new Mood(req.body);
    await newMood.save();
    res.status(201).json(newMood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an existing Mood
export const updateMood = async (req, res) => {
  try {
    const mood = await Mood.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(mood);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an existing Mood
export const deleteMood = async (req, res) => {
  try {
    await Mood.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
