import { MoodEntry } from "../../types/mood";

// Utils
import { isValidDate } from "../../utils/isValidDate";

const fillMissingDays = (data: MoodEntry[], startDate: string | Date) => {
  if (data.length === 0) return [];

  // Validate Dates
  const endDate = new Date(); // endDate is set to current time
  const areValidDates = isValidDate(startDate) && isValidDate(endDate) && startDate < endDate;
  if (!areValidDates) throw new Error('Error: End Date should come after Start Date.');

  // Create a map of existing data for quick lookup
  const dataMap = new Map(
    data.map(entry => [
      new Date(entry.createdAt).toISOString().split('T')[0],
      entry.rating
    ])
  );

  // Generate all dates in range
  interface ResultItem {
    createdAt: Date | string;
    rating: number | null;
  }
  const result: ResultItem[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateKey = currentDate.toISOString().split('T')[0];
    const rating = dataMap.get(dateKey);
    result.push({
      createdAt: new Date(currentDate),
      rating: rating !== undefined ? rating : null
    });
  }
};

export { fillMissingDays };
