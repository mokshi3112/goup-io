import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../features/tasks/taskSlice';
import { selectAllTasks, selectTaskLoading } from '../features/tasks/taskSelectors';
import type { AppDispatch } from '../store/store';
import TaskItem from '../components/TaskItem';
import Dashboard from '../components/Dashboard';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';

const TaskListPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [filter, setFilter] = useState<'all' | 'assigned' | 'completed'>('all');
    const [currentUser, setCurrentUser] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentUser(e.target.value);
    };

    const allTasks = useSelector(selectAllTasks);
    const loading = useSelector(selectTaskLoading);

    const tasks = useMemo(() => {
        let filtered = allTasks;

        // Status filter
        switch (filter) {
            case 'assigned':
                filtered = currentUser ? filtered.filter(task => task.assigneeId === currentUser) : filtered;
                break;
            case 'completed':
                filtered = filtered.filter(task => task.status === 'done');
                break;
        }

        // Priority filter
        if (priorityFilter !== 'all') {
            filtered = filtered.filter(task => task.priority === priorityFilter);
        }

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(query) ||
                task.description.toLowerCase().includes(query) ||
                task.tags?.some(tag => tag.toLowerCase().includes(query))
            );
        }

        return filtered;
    }, [allTasks, filter, currentUser, priorityFilter, searchQuery]);

    useEffect(() => {
        dispatch(fetchTasks({}));
    }, [dispatch]);

    return (
        <div className="space-y-6">
            <Dashboard />

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
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search tasks by title, description, or tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Filters */}
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

                    {/* Priority Filter */}
                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value as any)}
                        className="border rounded px-3 py-1 text-sm"
                    >
                        <option value="all">All Priorities</option>
                        <option value="high">High Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low">Low Priority</option>
                    </select>

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
