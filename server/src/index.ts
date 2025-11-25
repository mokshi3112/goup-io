import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import taskRoutes from './routes/taskRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('Task Tracker API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
