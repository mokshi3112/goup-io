import React from 'react';
import { Link } from 'react-router-dom';
import type { Task } from '../features/tasks/taskSlice';
import { Calendar, User, Tag } from 'lucide-react';

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const statusColors = {
        todo: 'bg-gray-200 text-gray-800',
        'in-progress': 'bg-yellow-200 text-yellow-800',
        done: 'bg-green-200 text-green-800',
    };

    const priorityColors = {
        low: 'bg-blue-200 text-blue-800 border-blue-400',
        medium: 'bg-yellow-200 text-yellow-800 border-yellow-400',
        high: 'bg-red-200 text-red-800 border-red-400 priority-high',
    };

    const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done';

    return (
        <div className={`bg-white shadow rounded-lg p-4 mb-4 hover:shadow-md transition-shadow ${isOverdue ? 'border-l-4 border-red-500' : ''}`}>
            <div className="flex justify-between items-start">
                <Link to={`/tasks/${task._id}`} className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]} border`}>
                            {task.priority.toUpperCase()}
                        </span>
                    </div>
                    <p className="text-gray-600 mt-1 line-clamp-2">{task.description}</p>
                </Link>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                    {task.status}
                </span>
            </div>

            {task.tags && task.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                    {task.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-indigo-100 text-indigo-700">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{task.assigneeId}</span>
                </div>
                <div className={`flex items-center ${isOverdue ? 'text-red-600 font-semibold' : ''}`}>
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    {isOverdue && <span className="ml-1 text-xs">(Overdue!)</span>}
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
