import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ManufacturingSidebar from './components/ManufacturingSidebar';
import ManufacturingDashboard from './components/ManufacturingDashboard';
import Productlist from './components/Productlist';
// import Payment from './components/Payment';

import Cart from './components/Cart';

const ManufacturingApp = () => {
    return (
        <ManufacturingSidebar>
            <Routes>
                <Route path="dashboard" element={<ManufacturingDashboard />} />
                <Route path="productlist" element={<Productlist />} />
                <Route path="cart" element={<Cart />} />
                {/* <Route path="payment" element={<Payment />} /> */}

                {/* Add other Manufacturing routes here */}
            </Routes>
        </ManufacturingSidebar>
    );
};

export default ManufacturingApp;
