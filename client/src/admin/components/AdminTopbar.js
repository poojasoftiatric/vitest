import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/topbar.css';
import 'boxicons/css/boxicons.min.css';

const Topbar = ({ toggleDarkMode, isDarkMode }) => {
    return (
        <div className="topbar">
            <div className="search-box">
                <i className='bx bx-search icon'></i>
                <input type="text" placeholder="Search..." />
            </div>
            <div className="topbar-right">
                <i className={`bx ${isDarkMode ? 'bx-sun' : 'bx-moon'} mode-icon`} onClick={toggleDarkMode}></i>
                <i className='bx bx-bell notification-icon'></i>
                <Link to="/profile">
                    <i className='bx bx-user profile-icon'></i>
                </Link>
            </div>
        </div>
    );
};

export default Topbar;
