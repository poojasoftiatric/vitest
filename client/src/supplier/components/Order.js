import React, { useState, useEffect } from 'react';
import { createOrder, getOrders, updateOrder, deleteOrder, dispatchOrder } from '../utils/api';
import '../styles/product.css';

const Order = () => {
    const [manufactureId, setmanufactureId] = useState('');
    const [manufactureName, setmanufactureName] = useState('');
    const [manufactureAddress, setmanufactureAddress] = useState('');
    const [orderId, setOrderId] = useState('');
    const [productName, setProductName] = useState('');
    const [stockAvailability, setStockAvailability] = useState('');
    const [productClass, setProductClass] = useState('');
    const [vendorName, setVendorName] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [orders, setOrders] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const ordersData = await getOrders();
            setOrders(ordersData);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setErrorMessage('Error fetching orders.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const order = { manufactureId, manufactureName, manufactureAddress, productName, stockAvailability, productClass, vendorName, price, imageUrl };

            if (isEditMode) {
                await updateOrder(orderId, order);
                setSuccessMessage('Order updated successfully!');
            } else {
                await createOrder(order);
                setSuccessMessage('Order added successfully!');
            }

            fetchOrders();
            resetForm();
        } catch (error) {
            console.error('Error adding/updating order:', error);
            setErrorMessage('Failed to add/update order. Please try again.');
        }
    };

    const handleDelete = async (orderId) => {
        try {
            await deleteOrder(orderId);
            fetchOrders();
            setSuccessMessage('Order deleted successfully!');
        } catch (error) {
            console.error('Error deleting order:', error);
            setErrorMessage('Failed to delete order. Please try again.');
        }
    };

    const handleDispatch = async (orderId) => {
        try {
            await dispatchOrder(orderId);
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.orderId === orderId ? { ...order, dispatched: true } : order
                )
            );
            setSuccessMessage('Order dispatched successfully!');
        } catch (error) {
            console.error('Error dispatching order:', error);
            setErrorMessage('Failed to dispatch order. Please try again.');
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const resetForm = () => {
        setmanufactureId('');
        setmanufactureName('');
        setmanufactureAddress('');
        setOrderId('');
        setProductName('');
        setStockAvailability('');
        setProductClass('');
        setVendorName('');
        setPrice('');
        setImageUrl('');
        setIsEditMode(false);
        setIsModalOpen(false);
        setSuccessMessage('');
        setErrorMessage('');
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        resetForm();
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessMessage('');
            setErrorMessage('');
        }, 3000);

        return () => clearTimeout(timer);
    }, [successMessage, errorMessage]);

    return (
        <div className="scontainer-bro">
            <div className="header-container">
                <h2>Order Details</h2>
                <button className="sbutton-bro" onClick={handleOpenModal}>
                    <i className="bx bx-plus-circle"></i> Add Order
                </button>
            </div>
            {successMessage && (
                <div className="success-popup-bro">
                    {successMessage}
                    <button className="close-button" onClick={() => setSuccessMessage('')}>X</button>
                </div>
            )}
            {errorMessage && (
                <div className="error-popup-bro">
                    {errorMessage}
                    <button className="close-button" onClick={() => setErrorMessage('')}>X</button>
                </div>
            )}
            <div className="product-list-bro">
                <table>
                    <thead>
                        <tr>
                            <th>Manufacture ID</th>
                            <th>Manufacture Name</th>
                            <th>Manufacture Address</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Class</th>
                            <th>Vendor</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderId}>
                                <td>{order.manufactureId}</td>
                                <td>{order.manufactureName}</td>
                                <td>{order.manufactureAddress}</td>
                                <td>{order.productName}</td>
                                <td>${order.price}</td>
                                <td>{order.stockAvailability}</td>
                                <td>{order.productClass}</td>
                                <td>{order.vendorName}</td>
                                <td>
                                    {order.imageUrl && <img className="product-image" src={order.imageUrl} alt={order.orderName} />}
                                </td>
                                <td>
                                    <button
                                        className={`sbutton-brops ${order.dispatched ? 'dispatched-button' : ''}`}
                                        onClick={() => handleDispatch(order.orderId)}
                                        disabled={order.dispatched}
                                    >
                                        <i className="fa fa-truck"></i>{order.dispatched ? ' Dispatched' : ' Dispatch'}
                                    </button>
                                    <button className="sbutton-bropss" onClick={() => handleDelete(order.orderId)}>
                                        <i className="bx bx-trash"></i> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <div>
                    <div className="overlay-bro" onClick={handleCloseModal}></div>
                    <div className="smodal-bro">
                        <div className="modal-content-bro">
                            <h2>{isEditMode ? 'Edit Order' : 'Add Order'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="sfield-bro">
                                    <label className="label-bro">Manufacture ID:</label>
                                    <input className="input-bro" type="text" value={manufactureId} onChange={(e) => setmanufactureId(e.target.value)} required />
                                </div>
                                <div className="sfield-bro">
                                    <label className="label-bro">Manufacture Name:</label>
                                    <input className="input-bro" type="text" value={manufactureName} onChange={(e) => setmanufactureName(e.target.value)} required />
                                </div>
                                <div className="sfield-bro">
                                    <label className="label-bro">Manufacture Address:</label>
                                    <input className="input-bro" type="text" value={manufactureAddress} onChange={(e) => setmanufactureAddress(e.target.value)} required />
                                </div>
                                <div className="sfield-bro">
                                    <label className="label-bro">Name:</label>
                                    <input className="input-bro" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                                </div>
                                <div className="sfield-bro">
                                    <label className="label-bro">Stock Availability:</label>
                                    <input className="input-bro" type="number" value={stockAvailability} onChange={(e) => setStockAvailability(e.target.value)} required />
                                </div>
                                <div className="sfield-bro">
                                    <label className="label-bro">Class:</label>
                                    <input className="input-bro" type="text" value={productClass} onChange={(e) => setProductClass(e.target.value)} required />
                                </div>
                                <div className="sfield-bro">
                                    <label className="label-bro">Vendor Name:</label>
                                    <input className="input-bro" type="text" value={vendorName} onChange={(e) => setVendorName(e.target.value)} required />
                                </div>
                                <div className="sfield-bro">
                                    <label className="label-bro">Price:</label>
                                    <input className="input-bro" type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required />
                                </div>
                                <div className="sfield-bro">
                                    <label className="label-bro">Image:</label>
                                    <input className="input-bros" type="file" onChange={handleImageUpload} required={!isEditMode} />
                                    {imageUrl && <img className="product-image" src={imageUrl} alt="Order" width="100" />}
                                </div>
                                <div className="modal-footer">
                                    <button className="sbutton-brop" type="submit">{isEditMode ? 'Update Order' : 'Add Order'}</button>
                                    <button className="sbutton-bros" type="button" onClick={handleCloseModal}>Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Order;
