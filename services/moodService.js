import mongoose from 'mongoose';
import Mood from '../models/Mood.js';

// Constants
import { NUM_OF_DAYS } from '../constants/DATE_GRANULARITY.js';

// Utils
import { fillMissingDays } from './utils/fillMissingDays.ts';
import { isValidDate } from '../utils/isValidDate.ts';

const getMoodRatingsByDateRange = async (userId, startDate, endDate) => {
  const dayRange = 60; // Default day range set to 60 days
  const lte = (!endDate || endDate === 'undefined') ? new Date() : new Date(endDate); // If endDate doesn't exist, set to current date/time
  const gte = (!startDate || startDate === 'undefined') ? new Date() : new Date(startDate);

  if (!startDate) {
    gte.setDate(lte.getDate() - dayRange); // If startDate doesn't exist, set gte to dayRange days ago.
  }

  // Date validation
  if (!isValidDate(gte)) throw new Error('Error: startDate is not a valid date');
  if (!isValidDate(lte)) throw new Error('Error: endDate is not a valid date');

  if (userId === 'undefined') userId = undefined;
  
  const moods = await Mood.find({
    userId,
    createdAt: {
      $gte: new Date(startDate), // Greater than or equal to start date
      $lte: new Date(endDate) // Less than or equal to end date
    }
  }).sort({ createdAt: -1 }); // 1 for ascending, -1 for decending

  return moods;
};

const getDailyAverages = async (userId, granularity) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - NUM_OF_DAYS[granularity]);

  const aggregatedData = await Mood.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        createdAt: { $gte: startDate }
      }
    },
    {
      $project: {
        date: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: {
              $add: ['$createdAt', 60 * 1000]
            }
          }
        },
        rating: 1
      }
    },
    {
      $group: {
        _id: '$date',
        date: { $first: '$date' },
        averageRating: { $avg: '$rating' },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { date: 1 }
    }
  ])

  return fillMissingDays(aggregatedData, startDate);
};

const getWeeklyAverages = async (userId, granularity) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - NUM_OF_DAYS[granularity] * 7)

  return await Mood.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        createdAt: { $gte: startDate }
      }
    },
    {
      $project: {
        year: { $year: { $add: ['$createdAt', 60 * 1000] } },
        week: { $week: { $add: ['$createdAt', 60 * 1000] } },
        rating: 1
      }
    },
    {
      $group: {
        _id: { year: '$year', week: '$week' },
        year: { $first: '$year' },
        week: { $first: '$week' },
        averageRating: { $avg: '$rating' },
        count: { $sum: 1 }
      }
    },
    {
      $sort: {
        '_id.year': 1, '_id.week': 1
      }
    }
  ])
};

const getMonthlyAverages = async (userId, granularity) => {
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - NUM_OF_DAYS[granularity]);

  return await Mood.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        createdAt: { $gte: startDate }
      }
    },
    {
      $project: {
        year: { $year: { $add: [ '$createdAt', 60 * 1000] } },
        month: { $month: { $add: ['$createdAt', 60 * 1000] } },
        rating: 1
      }
    },
    {
      $group: {
        _id: { year: '$year', month: '$month' },
        year: { $first: '$year' },
        month: { $first: '$month' },
        averageRating: { $avg: '$rating' },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 }
    }
  ]);
};

const getYearlyAverages = async (userId, granularity) => {
  return await Mood.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId)
      }
    },
    {
      $project: {
        year: { $year: '$createdAt' },
        rating: 1
      }
    },
    {
      $group: {
        _id: '$year',
        year: { $first: '$year' },
        averageRating: { $avg: '$rating' },
        count: { $sum: 1 }
      }
    },
    { $sort: { year: 1 } }
  ]);
};

export {
  getDailyAverages,
  getWeeklyAverages,
  getMonthlyAverages,
  getYearlyAverages,
  getMoodRatingsByDateRange
};
