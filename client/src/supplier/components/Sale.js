import React, { useState, useEffect } from 'react';
import { createSale, getSales, updateSale, deleteSale } from '../utils/api';
import '../styles/product.css';

const Sale = () => {
    const [manufactureId, setManufactureId] = useState('');
    const [manufactureName, setManufactureName] = useState('');
    const [manufactureAddress, setManufactureAddress] = useState('');
    const [saleId, setSaleId] = useState('');
    const [productName, setProductName] = useState('');
    const [stockAvailability, setStockAvailability] = useState('');
    const [productClass, setProductClass] = useState('');
    const [vendorName, setVendorName] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [sales, setSales] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {
        try {
            const salesData = await getSales();
            setSales(salesData);
        } catch (error) {
            console.error('Error fetching sales:', error);
            setErrorMessage('Error fetching sales.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const sale = { manufactureId, manufactureName, manufactureAddress, productName, stockAvailability, productClass, vendorName, price, imageUrl };

            if (isEditMode) {
                await updateSale(saleId, sale);
                setSuccessMessage('Sale updated successfully!');
            } else {
                await createSale(sale);
                setSuccessMessage('Sale added successfully!');
            }

            fetchSales();
            resetForm();
        } catch (error) {
            console.error('Error adding/updating sale:', error);
            setErrorMessage('Failed to add/update sale. Please try again.');
        }
    };

    const handleDelete = async (saleId) => {
        try {
            await deleteSale(saleId);
            fetchSales();
            setSuccessMessage('Sale deleted successfully!');
        } catch (error) {
            console.error('Error deleting sale:', error);
            setErrorMessage('Failed to delete sale. Please try again.');
        }
    };

    const handleEdit = (sale) => {
        setManufactureId(sale.manufactureId);
        setManufactureName(sale.manufactureName);
        setManufactureAddress(sale.manufactureAddress);
        setSaleId(sale.saleId);
        setProductName(sale.productName);
        setStockAvailability(sale.stockAvailability);
        setProductClass(sale.productClass);
        setVendorName(sale.vendorName);
        setPrice(sale.price);
        setImageUrl(sale.imageUrl);
        setIsEditMode(true);
        setIsModalOpen(true);
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
        setManufactureId('');
        setManufactureName('');
        setManufactureAddress('');
        setSaleId('');
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
                <h2>Sales Details</h2>
                <button className="sbutton-bro" onClick={handleOpenModal}>
                    <i className="bx bx-plus-circle"></i> Add Sales
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
                        {sales.map((sale) => (
                            <tr key={sale.saleId}>
                                <td>{sale.manufactureId}</td>
                                <td>{sale.manufactureName}</td>
                                <td>{sale.manufactureAddress}</td>
                                <td>{sale.productName}</td>
                                <td>${sale.price}</td>
                                <td>{sale.stockAvailability}</td>
                                <td>{sale.productClass}</td>
                                <td>{sale.vendorName}</td>
                                <td>
                                    {sale.imageUrl && <img className="product-image" src={sale.imageUrl} alt={sale.saleName} />}
                                </td>
                                <td>
                                    <button className="sbutton-brops" onClick={() => handleEdit(sale)}>
                                        <i className="bx bx-edit"></i> Edit
                                    </button>
                                    <button className="sbutton-bropss" onClick={() => handleDelete(sale.saleId)}>
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
                            <h2>{isEditMode ? 'Edit Sale' : 'Add Sale'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="sfield-bro">
                                    <label className="label-bro">Manufacture ID:</label>
                                    <input className="input-bro" type="text" value={manufactureId} onChange={(e) => setManufactureId(e.target.value)} required />
                                </div>
                                <div className="sfield-bro">
                                    <label className="label-bro">Manufacture Name:</label>
                                    <input className="input-bro" type="text" value={manufactureName} onChange={(e) => setManufactureName(e.target.value)} required />
                                </div>
                                <div className="sfield-bro">
                                    <label className="label-bro">Manufacture Address:</label>
                                    <input className="input-bro" type="text" value={manufactureAddress} onChange={(e) => setManufactureAddress(e.target.value)} required />
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
                                    {imageUrl && <img className="product-image" src={imageUrl} alt="Sale" width="100" />}
                                </div>
                                <div className="modal-footer">
                                    <button className="sbutton-brop" type="submit">{isEditMode ? 'Update Sale' : 'Add Sale'}</button>
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

export default Sale;
