import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask, type Task } from '../features/tasks/taskSlice';
import type { AppDispatch } from '../store/store';
import axios from 'axios';
import { Trash2, ArrowLeft, Save } from 'lucide-react';

const TaskDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [task, setTask] = useState<Task | null>(null);
    const [status, setStatus] = useState<'todo' | 'in-progress' | 'done'>('todo');

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
                setTask(response.data);
                setStatus(response.data.status);
            } catch (error) {
                console.error('Failed to fetch task', error);
            }
        };
        if (id) fetchTask();
    }, [id]);

    const handleStatusChange = async () => {
        if (task && id) {
            try {
                await dispatch(updateTask({ id, data: { status } })).unwrap();
                alert('Status updated successfully!');
                navigate('/');
            } catch (error) {
                console.error('Failed to update task:', error);
                alert('Failed to update status. Please try again.');
            }
        }
    };

    const handleDelete = async () => {
        if (id && window.confirm('Are you sure you want to delete this task?')) {
            try {
                await dispatch(deleteTask(id)).unwrap();
                navigate('/');
            } catch (error) {
                console.error('Failed to delete task:', error);
                alert('Failed to delete task. Please try again.');
            }
        }
    };

    if (!task) return <div>Loading...</div>;

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div className="flex items-center">
                    <button onClick={() => navigate('/')} className="mr-4 text-gray-500 hover:text-gray-700">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Task Details</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">ID: {task._id}</p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={handleDelete}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                    </button>
                </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Title</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{task.title}</dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Description</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{task.description}</dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Assignee ID</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{task.assigneeId}</dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{new Date(task.dueDate).toLocaleDateString()}</dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Status</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center space-x-4">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as any)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                                <option value="todo">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                            <button
                                onClick={handleStatusChange}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Update Status
                            </button>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default TaskDetailPage;
