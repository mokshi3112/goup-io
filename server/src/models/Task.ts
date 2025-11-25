import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description: string;
    assigneeId: string;
    status: 'todo' | 'in-progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    tags: string[];
    dueDate: Date;
    createdAt: Date;
}

const TaskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    assigneeId: { type: String, required: true },
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'done'],
        default: 'todo'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    tags: { type: [String], default: [] },
    dueDate: { type: Date, required: true },
}, {
    timestamps: true
});

export default mongoose.model<ITask>('Task', TaskSchema);
