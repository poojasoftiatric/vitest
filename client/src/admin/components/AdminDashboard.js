import React, { useState } from 'react';
import Manufacturing from '../../Manufacturing'; // Correct path to Manufacturing.js in the src folder
import Supplier from '../../Supplier'; // Correct path to Supplier.js in the src folder

const AdminDashboard = () => {
    const [showComponent, setShowComponent] = useState(''); // Initially, no component is displayed

    const toggleComponent = () => {
        setShowComponent(prevComponent => {
            if (prevComponent === 'Supplier') {
                return 'Manufacturing';
            } else if (prevComponent === 'Manufacturing') {
                return 'Supplier';
            } else {
                return 'Supplier'; // Start with Supplier
            }
        });
    };

    const getNextComponentName = () => {
        if (showComponent === 'Supplier') {
            return 'Manufacturing';
        } else if (showComponent === 'Manufacturing') {
            return 'Supplier';
        } else {
            return 'Supplier'; // Start with Supplier
        }
    };

    return (
        <div className="container-bro">
            <button className="button-bro" onClick={toggleComponent}>
                {getNextComponentName()}
            </button>
            {showComponent === 'Supplier' && <Supplier />}
            {showComponent === 'Manufacturing' && <Manufacturing />}
        </div>
    );
};

export default AdminDashboard;
