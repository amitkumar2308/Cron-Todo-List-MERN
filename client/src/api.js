import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

// Function to get the token from localStorage or any other storage method
const getToken = () => localStorage.getItem('token');

export const getTasks = async () => {
    const token = getToken();
    return axios.get(`${BASE_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const addTask = async (taskData) => {
    const token = getToken();
    return axios.post(`${BASE_URL}/tasks`, taskData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const updateTask = async (taskId, taskData) => {
    const token = getToken();
    return axios.put(`${BASE_URL}/tasks/${taskId}`, taskData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteTask = async (taskId) => {
    const token = getToken();
    return axios.delete(`${BASE_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const loginUser = async (userData) => {
    return axios.post(`${BASE_URL}/auth/login`, userData);
};

export const registerUser = async (userData) => {
    return axios.post(`${BASE_URL}/auth/register`, userData);
};
