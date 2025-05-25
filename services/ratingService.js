import mongoose from 'mongoose';
import Mood from '../models/Mood.js';

const getAggregatedRatings = async (userId, startDate, endDate, granularity) => {
  const aggregationPipeline = [];

  // 1. Match ratings within date range
  aggregationPipeline.push({
    $match: {
      userId: new mongoose.Types.ObjectId(userId), // TODO: Look into non-deprecated alternative
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }
  });

  // 2. Group by time period
  const dateProjection = getDateProjection(granularity);

  aggregationPipeline.push({
    $group: {
      _id: {
        $dateTrunc: {
          date: '$createdAt',
          unit: 'day' // Group by day // TODO: Update when dealing with other granularity(s)
        }
      },
      date: { $first: dateProjection },
      averageRating: { $avg: "$rating" },
      minRating: { $min: "$rating" },
      maxRating: { $max: "$rating" },
      count: { $sum: 1 },
      entries: { $push: '$$ROOT' } // Keep raw entries for time-based charts
    }
  });

  // 3. Fill in missing dates
  aggregationPipeline.push({
    $densify: {
      field: '_id', // a Date, not a string
      range: {
        step: 1,
        unit: 'day', // TODO: Update when dealing with other granularity(s)
        bounds: [new Date(startDate), new Date(endDate)]
      }
    }
  });

  // 4. Sort by date
  aggregationPipeline.push({ $sort: { _id: 1 }});

  // 5. Project final format
  aggregationPipeline.push({
    $project: {
      _id: 0,
      date: getDateProjection(granularity), // Date converted to string
      averageRating: { $round: ["$averageRating", 2] },
      minRating: 1,
      maxRating: 1,
      count: { $ifNull: ['$count', 0] }, // Default to 0 if missing
    }
  });

  return await Mood.aggregate(aggregationPipeline);
};

const getDateProjection = (granularity) => {
  const format = {
    daily: '%Y-%m-%d',
    weekly: '%Y-%U',
    monthly: '%Y-%m'
  }[granularity] || '%Y-%m-%d';
  
  return { $dateToString: { format, date: '$_id' } };
};

export { getAggregatedRatings };
