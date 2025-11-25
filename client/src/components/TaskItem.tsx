import React from 'react';
import { Link } from 'react-router-dom';
import type { Task } from '../features/tasks/taskSlice';
import { Calendar, User } from 'lucide-react';

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const statusColors = {
        todo: 'bg-gray-200 text-gray-800',
        'in-progress': 'bg-yellow-200 text-yellow-800',
        done: 'bg-green-200 text-green-800',
    };

    return (
        <div className="bg-white shadow rounded-lg p-4 mb-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <Link to={`/tasks/${task._id}`} className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                    <p className="text-gray-600 mt-1 line-clamp-2">{task.description}</p>
                </Link>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                    {task.status}
                </span>
            </div>
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{task.assigneeId}</span>
                </div>
                <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
