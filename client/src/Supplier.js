import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './styles/login.css';

const Supplier = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/suppliers/register', { username, email, password });
            setSuccess('Registered successfully. Go to login.');
            setIsModalOpen(true);
        } catch (err) {
            setError(err.response.data.msg);
            setIsModalOpen(true);
        }
    };



    const closeModal = () => {
        setIsModalOpen(false);
        setError('');
        setSuccess('');
        if (success) {
            navigate('/admin/AdminDashboard');
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
            <div className="dropdown">
                    <h2>Supplier</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <span className="fas fa-user"></span>
                        <label>Username</label>
                    </div>
                    <div className="field">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <span className="fas fa-envelope"></span>
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
                    <button className="button-login" type="submit">Register</button>
                </form>

                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Registration Status"
                    className="modal"
                    overlayClassName="overlay"
                >
                    {error ? (
                        <div className="modal-content error">
                            <h2>Error</h2>
                            <p>{error}</p>
                        </div>
                    ) : (
                        <div className="modal-content success">
                            <h2>Success</h2>
                            <p>{success}</p>
                        </div>
                    )}
                    <button onClick={closeModal} className="close-modal">OK</button>
                </Modal>
            </div>
        </div>
    );
};

export default Supplier;
