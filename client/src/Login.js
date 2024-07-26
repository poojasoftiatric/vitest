import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userExists, setUserExists] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserCount = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/users/count');
                setUserExists(res.data.userCount > 0);
            } catch (err) {
                console.error(err.message);
            }
        };

        checkUserCount();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check in the users collection
            const userRes = await axios.post('http://localhost:5000/api/users/login', { email, password });
            if (userRes.data) {
                navigate('/admin/admindashboard');
                return;
            }
        } catch (err) {
            // Ignore the error here, as it might mean the user is not in the users collection
        }

        try {
            // Check in the suppliers collection
            const supplierRes = await axios.post('http://localhost:5000/api/suppliers/login', { email, password });
            if (supplierRes.data) {
                navigate('/supplier/supplierdashboard');
                return;
            }
        } catch (err) {
            // Ignore the error here, as it might mean the user is not in the suppliers collection
        }

        try {
            // Check in the manufacturings collection
            const manufacturingRes = await axios.post('http://localhost:5000/api/manufacturings/login', { email, password });
            if (manufacturingRes.data) {
                navigate('/manufacturing/manufaturingdashboard');
                return;
            }
        } catch (err) {
            // Set error message if the user is not found in any collection
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="text">Login Form</div>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <input 
                            type="text" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <span className="fas fa-user"></span>
                        <label>Email</label>
                    </div>
                    <div className="field">
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <span className="fas fa-lock"></span>
                        <label>Password</label>
                    </div>
                    <div className="forgot-pass">
                        <a href="/Forgot">Forgot Password?</a>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button className="button-login" type="submit">Login</button>
                    {!userExists && (
                        <div className="sign-up">
                            Not a member? <a href="/register">Register</a>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;
