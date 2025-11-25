import { Request, Response } from 'express';
import Task, { ITask } from '../models/Task';

export const getTasks = async (req: Request, res: Response) => {
    try {
        const { assigneeId, status } = req.query;
        const filter: any = {};
        if (assigneeId) filter.assigneeId = assigneeId;
        if (status) filter.status = status;

        const tasks = await Task.find(filter).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description, assigneeId, dueDate } = req.body;
        const newTask = new Task({
            title,
            description,
            assigneeId,
            dueDate,
            status: 'todo'
        });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const getTaskById = async (req: Request, res: Response) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
