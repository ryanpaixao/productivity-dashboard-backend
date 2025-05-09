import express from 'express';
import { getHabits, createHabit, updateHabit, deleteHabit } from '../controllers/habitController.js';

const router = express.Router();

router.get('/', getHabits);
router.post('/', createHabit);
router.put('/:id', updateHabit);
router.delete('/:id', deleteHabit);

export default router;
