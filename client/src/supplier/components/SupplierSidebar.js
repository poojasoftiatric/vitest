import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import '../styles/sidebar.css';
import 'boxicons/css/boxicons.min.css';

import SupplierTopbar from './SupplierTopbar';
import Product from './Product';
import Order from './Order'; 
import Sale from './Sale'; 

import SupplierFooter from './SupplierFooter';

const Sidebar = () => {
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
                            <span className="profession">SPL</span>
                        </div>
                    </div>
                    <i className='bx bx-chevron-right toggle' onClick={toggleSidebar}></i>
                </header>

                <div className="menu-bar">
                    <div className="menu">
                        <ul className="menu-links">
                            <li className="nav-link">
                                <Link to="/supplier/supplierdashboard">
                                    <i className='bx bx-home-alt icon'></i>
                                    <span className="text nav-text">SDashboard</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link to="/supplier/order">
                                    <i className='bx bx-bar-chart-alt-2 icon'></i>
                                    <span className="text nav-text">Order</span>
                                </Link>
                            </li>
                           
                            <li className="nav-link">
                                <a href="/supplier/product">
                                    <i className='bx bx-pie-chart-alt icon'></i>
                                    <span className="text nav-text">Product</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="/supplier/sale">
                                    <i className='bx bx-heart icon'></i>
                                    <span className="text nav-text">Sale</span>
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
                <SupplierTopbar toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
                <div className="content">
                    <Routes>
                        <Route path="/product" element={<Product />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/sale" element={<Sale />} />

                    </Routes>
                </div>
                <SupplierFooter />
            </section>
        </div>
    );
};

export default Sidebar;
