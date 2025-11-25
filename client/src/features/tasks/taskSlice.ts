import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Types
export interface Task {
    _id: string;
    title: string;
    description: string;
    assigneeId: string;
    status: 'todo' | 'in-progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    tags: string[];
    dueDate: string;
    createdAt: string;
}

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
};

const API_URL = 'http://localhost:5000/api/tasks';

// Async Thunks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (filter: { assigneeId?: string; status?: string } = {}) => {
    const params = new URLSearchParams();
    if (filter.assigneeId) params.append('assigneeId', filter.assigneeId);
    if (filter.status) params.append('status', filter.status);

    const response = await axios.get(`${API_URL}?${params.toString()}`);
    return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (taskData: Partial<Task>) => {
    const response = await axios.post(API_URL, taskData);
    return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, data }: { id: string; data: Partial<Task> }) => {
    const response = await axios.patch(`${API_URL}/${id}`, data);
    return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

// Slice
const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Tasks
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch tasks';
            })
            // Add Task
            .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.tasks.unshift(action.payload);
            })
            // Update Task
            .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
                const index = state.tasks.findIndex((task) => task._id === action.payload._id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            // Delete Task
            .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
                state.tasks = state.tasks.filter((task) => task._id !== action.payload);
            });
    },
});

export default taskSlice.reducer;
