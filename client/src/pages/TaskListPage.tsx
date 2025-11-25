import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../features/tasks/taskSlice';
import { selectAllTasks, selectTaskLoading } from '../features/tasks/taskSelectors';
import type { AppDispatch } from '../store/store';
import TaskItem from '../components/TaskItem';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const TaskListPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [filter, setFilter] = useState<'all' | 'assigned' | 'completed'>('all');
    const [currentUser, setCurrentUser] = useState(''); // Simulating current user for "Assigned to me"

    // In a real app, this would come from auth state
    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentUser(e.target.value);
    };

    const allTasks = useSelector(selectAllTasks);
    const loading = useSelector(selectTaskLoading);

    const tasks = useMemo(() => {
        switch (filter) {
            case 'assigned':
                return currentUser ? allTasks.filter(task => task.assigneeId === currentUser) : allTasks;
            case 'completed':
                return allTasks.filter(task => task.status === 'done');
            default:
                return allTasks;
        }
    }, [allTasks, filter, currentUser]);

    useEffect(() => {
        dispatch(fetchTasks({}));
    }, [dispatch]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
                <Link
                    to="/add-task"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                </Link>
            </div>

            <div className="bg-white p-4 rounded-lg shadow space-y-4">
                <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'all' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('assigned')}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'assigned' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Assigned to me
                        </button>
                        <button
                            onClick={() => setFilter('completed')}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'completed' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Completed
                        </button>
                    </div>

                    {filter === 'assigned' && (
                        <input
                            type="text"
                            placeholder="Enter your User ID"
                            value={currentUser}
                            onChange={handleUserChange}
                            className="border rounded px-2 py-1 text-sm"
                        />
                    )}
                </div>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.map((task) => (
                        <TaskItem key={task._id} task={task} />
                    ))}
                    {tasks.length === 0 && (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            No tasks found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskListPage;
