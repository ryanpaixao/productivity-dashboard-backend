import express from 'express';
import { getHabits, createHabit, updateHabit, deleteHabit, toggleHabit } from '../controllers/habitController.js';

const router = express.Router();

router.get('/', getHabits);
router.post('/', createHabit);
router.put('/:id', updateHabit);
router.patch('/:id/toggle', toggleHabit);
router.delete('/:id', deleteHabit);

export default router;
