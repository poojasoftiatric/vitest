import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminDashboard from './components/AdminDashboard';
import Product from './components/Product';
import Manufacturing from '../Manufacturing'; // Correct path to Manufacturing.js in the src folder
import Supplier from '../Supplier'; // Correct path to Supplier.js in the src folder

const AdminApp = () => {
    return (
        <AdminSidebar>
            <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="product" element={<Product />} />
                <Route path="manufacturing" element={<Manufacturing />} />
                <Route path="supplier" element={<Supplier />} /> {/* Add Supplier route */}
                {/* Add other Admin routes here */}
            </Routes>
        </AdminSidebar>
    );
};

export default AdminApp;
