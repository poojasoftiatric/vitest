import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createCart, updateCart, getCarts } from '../utils/api';

import 'boxicons/css/boxicons.min.css';
import '../styles/cart.css';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [cartId, setCartId] = useState('');
    const [userName, setUserName] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [carts, setCarts] = useState([]);
    const [district, setDistrict] = useState([]);

    const [, setImageUrl] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        loadCart();
        fetchCarts();
    }, []);

    const loadCart = () => {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(cartData);
    };

    const fetchCarts = async () => {
        try {
            const response = await axios.get('/api/carts');
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching carts:', error);
        }
        try {
            const CartsData = await getCarts();
            setCarts(CartsData);
        } catch (error) {
            console.error('Error fetching products:', error);
            setErrorMessage('Error fetching products.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const cart = { userName, zip, country, state, phone, address, district };

            if (isEditMode) {
                await updateCart(cartId, cart);
                setSuccessMessage('Cart updated successfully!');
            } else {
                await createCart(cart);
                setSuccessMessage('Cart added successfully!');
            }

            resetForm();
            fetchCarts();
        } catch (error) {
            console.error('Error adding/updating cart:', error);
            setErrorMessage('Failed to add/update cart. Please try again.');
        }
    };

   
    const resetForm = () => {
        setCartId('');
        setUserName('');
        setZip('');
        setCountry('');
        setState('');
        setPhone('');
        setAddress('');
setDistrict('');
        setImageUrl('');
        setIsEditMode(false);
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.productId !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessMessage('');
            setErrorMessage('');
        }, 3000);

        return () => clearTimeout(timer);
    }, [successMessage, errorMessage]);

    return (
        <div className="cart-container">
            <div className="cart-items">
                <h2>Shopping Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <>
                        {cart.map(item => (
                            <div className="cart-item" key={item.productId}>
                                <img src={item.imageUrl} alt={item.productName} className="img" />
                                <div>
                                    <h3>{item.productName}</h3>
                                    <p>Quantity: {item.quantity}.</p>
                                    <p>₹{item.price}.</p>
                                    <p>Tottal:{item.quantity * item.price}.</p>
                                    <button className="remove-cart" onClick={() => removeFromCart(item.productId)}>Remove</button>
                                </div>
                                <hr></hr>
                            </div>
                        ))}
                        <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
                    </>
                )}
            </div>

            <div className="cart-form">
                <h2>{isEditMode ? 'Edit Cart' : 'Add Cart'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="sfield-bro">
                        <label className="label-bro">User Name:</label>
                        <input className="input-bro" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                    </div>
                   
                    <div className="sfield-bro">
                        <label className="label-bro">Country:</label>
                        <input className="input-bro" type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </div>
                    <div className="sfield-bro">
                        <label className="label-bro">State:</label>
                        <input className="input-bro" type="text" value={state} onChange={(e) => setState(e.target.value)} required />
                    </div>
                    <div className="sfield-bro">
                        <label className="label-bro">City:</label>
                        <input className="input-bro" type="text" value={district} onChange={(e) => setDistrict(e.target.value)} required />
                    </div> 
                    <div className="sfield-bro">
                        <label className="label-bro">Pin Code:</label>
                        <input className="input-bro" type="number" value={zip} onChange={(e) => setZip(e.target.value)} required />
                    </div>
                    <div className="sfield-bro">
                        <label className="label-bro">Address:</label>
                        <input className="input-bro" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                    
                    <div className="sfield-bro">
                        <label className="label-bro">Mobile Number:</label>
                        <input className="input-bro" type="number" value={phone} onChange={(e) => setPhone(parseFloat(e.target.value))} required />
                    </div>
                    
                    <div className="sfield-bro">
                        <button className="button-cart" type="submit">{isEditMode ? 'Update Cart' : 'Add Cart'}</button>
                    </div>
                </form>
            </div>

            <div className="Yorder">
                <div className="title">
                    <h2>Customer Details</h2>
                </div>
                <table className="table">
                    <tbody>
                       {carts.map((cart) => (
                            <tr key={cart.cartId}>
                               <tr><th>Customer:</th><td>{cart.userName}</td></tr>
                                <tr><th>Pin Code:</th><td>{cart.zip}</td></tr>
                               <tr><th>Country:</th><td>{cart.country}</td></tr>
                               <tr><th>State:</th><td>{cart.state}</td></tr>
                               <tr><th>City:</th><td>{cart.district}</td></tr>
                               <tr><th>Address:</th><td>{cart.address}</td></tr>

                                <tr><th>Phone.No:</th><td>{cart.phone}</td></tr>
                            </tr>
                        ))}    
                        <tr>
                            <td colSpan="2">
                                <input type="radio" name="dbt" value="cd" /> <img src="../cod.png" alt="" width="50" /> Cash on Delivery
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {successMessage && (
                <div className="success-popup-bros">
                    {successMessage}
                    <button className="close-button" onClick={() => setSuccessMessage('')}>X</button>
                </div>
            )}
            {errorMessage && (
                <div className="error-popup-bros">
                    {errorMessage}
                    <button className="close-button" onClick={() => setErrorMessage('')}>X</button>
                </div>
            )}
        </div>
    );
};

export default Cart;