import mongoose from 'mongoose';
import Mood from '../models/Mood.js';

const getAggregatedRatings = async (userId, startDate, endDate, granularity) => {
  const aggregationPipeline = [];

  // 1. Match ratings within date range
  aggregationPipeline.push({
    $match: {
      userId: new mongoose.Types.ObjectId(userId), // TODO: Look into non-deprecated alternative
      createdAt: {
        $gte: startDate,
        $lte: endDate
      }
    }
  });

  // 2. Group by time period
  const dateProjection = getDateProjection(granularity);

  aggregationPipeline.push({
    $group: {
      _id: dateProjection,
      date: { $first: dateProjection },
      averageRating: { $avg: "$rating" },
      minRating: { $min: "$rating" },
      maxRating: { $max: "$rating" },
      ratingCount: { $sum: 1 }
    }
  });

  // 3. Sort by date
  aggregationPipeline.push({ $sort: { _id: 1 }});

  // 4. Project final format
  aggregationPipeline.push({
    $project: {
      _id: 0,
      date: 1,
      averageRating: { $round: ["$averageRating", 2] },
      minRating: 1,
      maxRating: 1,
      ratingCount: 1
    }
  });

  return await Mood.aggregate(aggregationPipeline);
};

const getDateProjection = (granularity) => {
  switch (granularity) {
    case 'daily':
      return { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
    case 'weekly':
      return { $dateToString: { format:"%Y-%U", date: "$createdAt" } };
    case 'monthly':
      return { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
    default:
      throw new Error('Invalid granularity type');
  }
};

export { getAggregatedRatings };
