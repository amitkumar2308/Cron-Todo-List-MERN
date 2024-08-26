import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { toggleTheme, isDarkMode } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav className="bg-blue-500 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">ToDo App</Link>
                <div className="flex items-center">
                    <Link to="/dashboard" className="mr-4">Dashboard</Link>
                    <button 
                        onClick={handleLogout}
                        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition duration-300 mr-4"
                    >
                        Logout
                    </button>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={isDarkMode} 
                            onChange={toggleTheme}
                            className="sr-only"
                        />
                        <div className="w-11 h-6 bg-gray-300 rounded-full shadow-inner"></div>
                        <div className="absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out" 
                            style={{ transform: isDarkMode ? 'translateX(100%)' : 'translateX(0)' }}
                        ></div>
                    </label>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
