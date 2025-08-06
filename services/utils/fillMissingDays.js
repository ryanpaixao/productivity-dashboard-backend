// Utils
import { isValidDate } from "../../utils/isValidDate.js";

// interface MoodEntry {
//   _id: string;
//   date: Date; // Can be ISO string or Date object
//   averageRating: number; // Mood rating (1-5)
//   count?: number; // Optional aggregation count
// };

// interface FilledMoodEntry {
//   date: string;
//   averageRating: number | null;
//   _id: string | null; // Will be null for filled days
//   count: number | null; // Will be null for filled days
// }

const fillMissingDays = (data, startDate) => {
  if (data.length === 0) return [];

  // Validate Dates
  const endDate = new Date(); // endDate is set to current time
  const areValidDates = isValidDate(startDate) && isValidDate(endDate) && startDate < endDate;
  if (!areValidDates) throw new Error('Error: End Date should come after Start Date.');

  // Create Map with full entry data
  const dataMap = new Map();
  data.forEach(entry => {
    const date = typeof entry.date === 'string' ? new Date(entry.date) : entry.date;
    const dateKey = date.toISOString().split('T')[0];
    dataMap.set(dateKey, {
      _id: entry._id,
      averageRating: entry.averageRating,
      count: entry.count || 1, // Default count to 1 if not provided
      date: entry.date // Storing Date object now
    })
  });

  // Generate all dates in range
  const result = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateKey = currentDate.toISOString().split('T')[0];
    const existingEntry = dataMap.get(dateKey);

    result.push({
      date: dateKey,
      averageRating: existingEntry?.averageRating !== undefined ? existingEntry.averageRating : null,
      _id: existingEntry?._id ?? dateKey,
      count: existingEntry?.count ?? null
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
};

export { fillMissingDays };
