import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const API_URL = process.env.REACT_APP_API_URL;

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [deadline, setDeadline] = useState('');
    const [error, setError] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/todos`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setTasks(data);
            } catch (err) {
                setError('Error fetching tasks');
            }
        };
        fetchTasks();
    }, []);

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setTime(`${hours}:${minutes}:${seconds}`);
        };

        const interval = setInterval(updateClock, 1000);
        updateClock(); // Initialize the clock immediately

        return () => clearInterval(interval);
    }, []);

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${API_URL}/todos`, { task, deadline }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTasks([...tasks, data]);
            setTask('');
            setDeadline('');
        } catch (err) {
            setError('Error adding task');
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/todos/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTasks(tasks.filter(t => t._id !== id));
        } catch (err) {
            setError('Error deleting task');
        }
    };

    const handleUpdateTask = async (id, completed) => {
        try {
            await axios.put(`${API_URL}/todos/${id}`, { completed }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTasks(tasks.map(t => t._id === id ? { ...t, completed } : t));
        } catch (err) {
            setError('Error updating task');
        }
    };

    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
            <Navbar />
            <div className="container mx-auto p-8">
                <div className="flex justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Dashboard</h2>
                        {error && <p className="text-red-600 mb-4">{error}</p>}
                    </div>
                    <div className="flex items-center">
                        <div className="text-gray-800 dark:text-gray-200 text-2xl font-medium">
                            {time}
                        </div>
                    </div>
                </div>
                <form onSubmit={handleAddTask} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Add New Task</h3>
                    <div className="mb-4">
                        <label htmlFor="task" className="block text-gray-700 dark:text-gray-400">Task</label>
                        <input
                            type="text"
                            id="task"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="deadline" className="block text-gray-700 dark:text-gray-400">Deadline</label>
                        <input
                            type="date"
                            id="deadline"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Add Task
                    </button>
                </form>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.map(task => (
                        <div key={task._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{task.task}</h3>
                                <p className="text-gray-600 dark:text-gray-400">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                            </div>
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => handleUpdateTask(task._id, !task.completed)}
                                    className={`px-4 py-2 rounded-lg text-white ${task.completed ? 'bg-green-500' : 'bg-gray-500'}`}
                                >
                                    {task.completed ? 'Completed' : 'Mark as Done'}
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(task._id)}
                                    className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
