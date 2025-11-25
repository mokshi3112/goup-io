import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllTasks } from '../features/tasks/taskSelectors';
import { CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
    const tasks = useSelector(selectAllTasks);

    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'done').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        todo: tasks.filter(t => t.status === 'todo').length,
        overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'done').length,
        highPriority: tasks.filter(t => t.priority === 'high').length,
    };

    const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">Total Tasks</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-indigo-600" />
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">Completed</p>
                        <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                        <p className="text-xs text-gray-500">{completionRate}% completion</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">In Progress</p>
                        <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">Overdue</p>
                        <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
                        <p className="text-xs text-gray-500">{stats.highPriority} high priority</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
