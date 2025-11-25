import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description: string;
    assigneeId: string;
    status: 'todo' | 'in-progress' | 'done';
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
    dueDate: { type: Date, required: true },
}, {
    timestamps: true
});

export default mongoose.model<ITask>('Task', TaskSchema);
