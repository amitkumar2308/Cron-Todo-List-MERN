import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log('Email:', email); // Debugging log
            console.log('Password:', password); // Debugging log
    
            const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login Error:', err.response?.data?.message || err.message);
            setError('Invalid credentials');
        }
    };
    
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg border border-gray-300">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">To Do List</h2>
                <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Login</h3>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Don't have an account? <a href="/register" className="text-blue-600 hover:underline font-medium">Register</a>
                    </p>
                    <p className="text-gray-600 mt-2">
                        <a href="/forgot-password" className="text-blue-600 hover:underline font-medium">Forgot Password?</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
