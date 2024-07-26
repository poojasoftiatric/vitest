import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import '../styles/sidebar.css';
import 'boxicons/css/boxicons.min.css';

import ManufacturingTopbar from './ManufacturingTopbar';
import ManufacturingDashboard from './ManufacturingDashboard';
import Productlist from './Productlist';
import Cart from './Cart'; 
// import Payment from './Payment'; 

import ManufacturingFooter from './ManufacturingFooter';

const ManufacturingSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
   
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`body ${isDarkMode ? 'dark' : ''}`}>
            <nav className={`sidebar ${isSidebarOpen ? '' : 'close'}`}>
                <header>
                    <div className="image-text">
                        <span className="image">
                            <img src="b.jpg" alt="" />
                        </span>
                        <div className="text logo-text">
                            <span className="name">BOICHON</span>
                            <span className="profession">SIS</span>
                        </div>
                    </div>
                    <i className='bx bx-chevron-right toggle' onClick={toggleSidebar}></i>
                </header>

                <div className="menu-bar">
                    <div className="menu">
                        <ul className="menu-links">
                            <li className="nav-link">
                                <Link to="/manufacturing/manufacturingdashboard">
                                    <i className='bx bx-home-alt icon'></i>
                                    <span className="text nav-text">MDashboard</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link to="/manufacturing/productlist">
                                    <i className='bx bx-bar-chart-alt-2 icon'></i>
                                    <span className="text nav-text">Productlist</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link to="/manufacturing/manufacturing">
                                    <i className='bx bx-bar-chart-alt-2 icon'></i>
                                    <span className="text nav-text">Manufacturing</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <a href="payment">
                                    <i className='bx bx-pie-chart-alt icon'></i>
                                    <span className="text nav-text">Payment</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="bro">
                                    <i className='bx bx-heart icon'></i>
                                    <span className="text nav-text">Likes</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="bro">
                                    <i className='bx bx-wallet icon'></i>
                                    <span className="text nav-text">Wallets</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="bottom-content">
                        <li>
                            <a href="/">
                                <i className='bx bx-log-out icon'></i>
                                <span className="text nav-text">Logout</span>
                            </a>
                        </li>
                    </div>
                </div>
            </nav>
            <section className="home">
                <ManufacturingTopbar toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
                <div className="content">
                    <Routes>
                        <Route path="/manufacturingdashboard" element={<ManufacturingDashboard />} />
                        <Route path="/productlist" element={<Productlist />} />
                        <Route path="/cart" element={<Cart />} />
                        {/* <Route path="/payment" element={<Payment />} /> */}

                    </Routes>
                </div>
                <ManufacturingFooter />
            </section>
        </div>
    );
};

export default ManufacturingSidebar;
