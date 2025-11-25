import express from 'express';
import { getTasks, createTask, getTaskById, updateTask, deleteTask } from '../controllers/taskController';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
