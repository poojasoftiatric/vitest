import React, { useState, useEffect } from 'react';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../utils/api';
import '../styles/product.css';
import 'boxicons/css/boxicons.min.css';

const Product = () => {
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [stockAvailability, setStockAvailability] = useState('');
    const [productClass, setProductClass] = useState('');
    const [vendorName, setVendorName] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [products, setProducts] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const productsData = await getProducts();
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching products:', error);
            setErrorMessage('Error fetching products.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const product = { productName, stockAvailability, productClass, vendorName, price, imageUrl };

            if (isEditMode) {
                await updateProduct(productId, product);
                setSuccessMessage('Product updated successfully!');
            } else {
                await createProduct(product);
                setSuccessMessage('Product added successfully!');
            }

            fetchProducts();
            resetForm();
        } catch (error) {
            console.error('Error adding/updating product:', error);
            setErrorMessage('Failed to add/update product. Please try again.');
        }
    };

    const handleDelete = async (productId) => {
        try {
            await deleteProduct(productId);
            fetchProducts();
            setSuccessMessage('Product deleted successfully!');
        } catch (error) {
            console.error('Error deleting product:', error);
            setErrorMessage('Failed to delete product. Please try again.');
        }
    };

    const handleEdit = (product) => {
        setProductId(product.productId);
        setProductName(product.productName);
        setStockAvailability(product.stockAvailability);
        setProductClass(product.productClass);
        setVendorName(product.vendorName);
        setPrice(product.price);
        setImageUrl(product.imageUrl);
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
        setProductId('');
        setProductName('');
        setStockAvailability('');
        setProductClass('');
        setVendorName('');
        setPrice('');
        setImageUrl('');
        setIsEditMode(false);
        setIsModalOpen(false);
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
                <h2>Product Details</h2>
                <button className="sbutton-bro" onClick={handleOpenModal}>
                    <i className="bx bx-plus-circle"></i> Add Product
                </button>
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
            <div className="product-list-bro">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Stock Availability</th>
                            <th>Class</th>
                            <th>Vendor Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.productId}>
                                <td>{product.productName}</td>
                                <td>{product.stockAvailability}</td>
                                <td>{product.productClass}</td>
                                <td>{product.vendorName}</td>
                                <td>{product.price}</td>
                                <td>
                                    {product.imageUrl && <img className="product-image" src={product.imageUrl} alt={product.productName} />}
                                </td>
                                <td>
                                    <button className="sbutton-brops" onClick={() => handleEdit(product)}>
                                        <i className="bx bx-edit"></i> Edit
                                    </button>
                                    <button className="sbutton-bropss" onClick={() => handleDelete(product.productId)}>
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
                            <h2>{isEditMode ? 'Edit Product' : 'Add Product'}</h2>
                            <form onSubmit={handleSubmit}>
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
                                    {imageUrl && <img className="product-image" src={imageUrl} alt="Product" />}
                                </div>
                                <div className="modal-footer">
                                    <button className="sbutton-brop" type="submit">{isEditMode ? 'Update Product' : 'Add Product'}</button>
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

export default Product;
