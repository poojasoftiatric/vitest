import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SupplierSidebar from './components/SupplierSidebar';
import SupplierDashboard from './components/SupplierDashboard';
import Product from './components/Product';

const SupplierApp = () => {
    return (
        <SupplierSidebar>
            <Routes>
                <Route path="dashboard" element={<SupplierDashboard />} />
                <Route path="product" element={<Product />} />
                {/* Add other Supplier routes here */}
            </Routes>
        </SupplierSidebar>
    );
};

export default SupplierApp;
