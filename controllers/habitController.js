import Habit from '../models/Habit.js';

export const getHabits = async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
};

export const createHabit = async (req, res) => {
  const newHabit = new Habit(req.body);
  await newHabit.save();
  res.status(201).json(newHabit);
};

export const updateHabit = async (req, res) => {
  const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(habit);
};

export const deleteHabit = async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
