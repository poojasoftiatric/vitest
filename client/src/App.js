import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Register from './Register';
import Login from './Login';
import AdminApp from './admin/AdminApp';
import SupplierApp from './supplier/SupplierApp';
import ManufacturingApp from './manufacturing/ManufacturingApp';

import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin/*" element={<AdminApp />} />
                        <Route path="/supplier/*" element={<SupplierApp />} />
                        <Route path="/manufacturing/*" element={<ManufacturingApp />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
