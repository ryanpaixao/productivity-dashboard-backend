import mongoose from 'mongoose';
import Mood from '../models/Mood.js';

// generateMoodData: generates user data in Mood collection.

/* run in terminal:
  1) cd to mock directory that contains generateMoodData
  2) `node generateMoodData`
*/

const populateDatabase = async () => {
  await mongoose.connect('mongodb://localhost:27017/tracker');
  
  const startDate = new Date('2025-04-01');
  const endDate = new Date('2025-05-23');
  const users = Array.from({length: 5}, (_, i) => new mongoose.Types.ObjectId());
  const ratings = [];
  
  // Generate realistic patterns (higher ratings on weekends)
  for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
    const isWeekend = [0, 6].includes(day.getDay());
    const baseRating = isWeekend ? 3.5 : 2.3;
    
    // 0-6 ratings per day
    const ratingsCount = Math.floor(Math.random() * 6);
    
    for (let i = 0; i < ratingsCount; i++) {
      const ratingTime = new Date(day);
      ratingTime.setHours(8 + Math.floor(Math.random() * 12)); // 8AM-8PM
      ratingTime.setMinutes(Math.floor(Math.random() * 60));
      
      // Normally distributed ratings around baseRating
      // const rating = Math.min(5, Math.max(1, 
      //   Math.round(baseRating + (Math.random() - 0.5) * 2))
      // );
      const rating = Math.floor(Math.random() * 5) + 1;
      
      ratings.push({
        // userId: users[Math.floor(Math.random() * users.length)],
        userId: '6820e188c8970fadd5b3d4ce',
        rating,
        createdAt: new Date(ratingTime)
      });
    }
  }
  
  await Mood.insertMany(ratings);
  console.log(`Inserted ${ratings.length} ratings`);
  mongoose.disconnect();
};

populateDatabase().catch(console.error);
