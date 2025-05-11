import Habit from '../models/Habit.js';

// Get all Habits
export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
    res.status(200).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new Habit
export const createHabit = async (req, res) => {
  try {
    const newHabit = new Habit(req.body);
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an existing Habit
export const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(habit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an existing Habit
export const deleteHabit = async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
