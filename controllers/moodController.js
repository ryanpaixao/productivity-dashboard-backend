import Mood from '../models/Mood.js';
import {
  getDailyAverages,
  getWeeklyAverages,
  getMonthlyAverages,
  getYearlyAverages,
  getMoodRatingsByDateRange
} from '../services/moodService.js';

import { DATE_GRANULARITY } from '../constants/DATE_GRANULARITY.js';

// Get all Moods
export const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find();
    res.status(200).json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Moods by date range
export const getMoodsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate, userId } = req.query;

    const results = await getMoodRatingsByDateRange(
      userId,
      startDate,
      endDate
    );

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Mood Trends Daily
export const getMoodTrendsDaily = async (req, res) => {
  try {
    const { userId, granularity = DATE_GRANULARITY.DAILY } = req.query; // TODO: rm unnecessary granularity params from MoodTrends
    const results = await getDailyAverages(
      userId,
      granularity
    );

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(({ error: err.message }));
  }
};

// GET Mood Trends Weekly
export const getMoodTrendsWeekly = async (req, res) => {
  try {
    const { userId, granularity = DATE_GRANULARITY.WEEKLY } = req.query;
    const results = await getWeeklyAverages(
      userId,
      granularity
    );

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(({ error: err.message }));
  }
};

// GET Mood Trends Monthly
export const getMoodTrendsMonthly = async (req, res) => {
  try {
    const { userId, granularity = DATE_GRANULARITY.MONTHLY } = req.query;
    const results = await getMonthlyAverages(
      userId,
      granularity
    );

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(({ error: err.message }));
  }
};

// GET Mood Trends Yearly
export const getMoodTrendsYearly = async (req, res) => {
  try {
    const { userId, granularity = DATE_GRANULARITY.YEARLY } = req.query;
    const results = await getYearlyAverages(
      userId,
      granularity
    );

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(({ error: err.message }));
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
