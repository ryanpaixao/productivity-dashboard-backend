import express from 'express';
import {
  getMoods,
  getMoodsByDateRange,
  getPaginatedMoods,
  getMoodTrendsDaily,
  getMoodTrendsWeekly,
  getMoodTrendsMonthly,
  getMoodTrendsYearly,
  createMood,
  updateMood,
  deleteMood
} from '../controllers/moodController.js';

const router = express.Router();

// GET
router.get('/', getMoods);
router.get('/date-range', getMoodsByDateRange);
router.get('/paginated', getPaginatedMoods);
router.get('/trends/daily', getMoodTrendsDaily);
router.get('/trends/weekly', getMoodTrendsWeekly);
router.get('/trends/monthly', getMoodTrendsMonthly);
router.get('/trends/yearly', getMoodTrendsYearly);

// POST
router.post('/', createMood);

// PUT
router.put('/:id', updateMood);

// DELETE
router.delete('/:id', deleteMood);

export default router;
