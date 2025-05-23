import Mood from '../models/Mood.js';

const getAggregatedRatings = async (startDate, endDate, aggregationType) => {
  const aggregationPipeline = [];

  // 1. Match ratings within date range
  aggregationPipeline.push({
    $match: {
      createdAt: {
        $gte: startDate,
        $lte: endDate
      }
    }
  });

  // 2. Group by time period
  const dateProjection = getDateProjection(aggregationType);

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

const getDateProjection = (aggregationType) => {
  switch (aggregationType) {
    case 'daily':
      return { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
    case 'weekly':
      return { $dateToString: { format:"%Y-%U", date: "$createdAt" } };
    case 'monthly':
      return { $dateToString: { format: "%Y-%m", date: "$createAt" } };
    default:
      throw new Error('Invalid aggregation type');
  }
};

export { getAggregatedRatings };
