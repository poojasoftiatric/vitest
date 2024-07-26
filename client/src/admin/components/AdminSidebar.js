import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import '../styles/sidebar.css';
import 'boxicons/css/boxicons.min.css';

import AdminTopbar from './AdminTopbar';
import AdminDashboard from './AdminDashboard';
import Product from './Product';
import AdminFooter from './AdminFooter';
import Supplier from '../../Supplier'; // Correct path to Manufacturing.js in the src folder


const AdminSidebar = () => {
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
                            <img src="../b.jpg" alt="" />
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
                                <Link to="/admin/admindashboard">
                                    <i className='bx bx-home-alt icon'></i>
                                    <span className="text nav-text">ADashboard</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link to="/admin/product">
                                    <i className='bx bx-bar-chart-alt-2 icon'></i>
                                    <span className="text nav-text">Product</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link to="/supplier">
                                    <i className='bx bx-bar-chart-alt-2 icon'></i>
                                    <span className="text nav-text">Supplier</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <a href="bro">
                                    <i className='bx bx-pie-chart-alt icon'></i>
                                    <span className="text nav-text">Analytics</span>
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
                <AdminTopbar toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
                <div className="content">
                    <Routes>
                        <Route path="/admindashboard" element={<AdminDashboard />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/supplier" element={<Supplier />} />
                        {/* <Route path="/cart" element={<Cart />} /> */}
                        {/* <Route path="/supplier" element={<Supplier />} /> */}

                        {/* <Route path="/order" element={<Order />} /> */}
                    </Routes>
                </div>
                <AdminFooter />
            </section>
        </div>
    );
};

export default AdminSidebar;
