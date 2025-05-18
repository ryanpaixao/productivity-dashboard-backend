import express from 'express';
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.patch('/:id/toggle', toggleTask);
router.delete('/:id', deleteTask);

export default router;
