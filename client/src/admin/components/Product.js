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
        setSuccessMessage('');
        setErrorMessage('');
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        resetForm();
    };

    return (
            <div className="container-bro">
                <div className="product-list-bro">
                    <div className="header-container">
                        <h2>Product List</h2>
                        <button className="button-bro" onClick={handleOpenModal}><i class="fa-solid fa-circle-plus"> Product</i> </button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Class</th>
                                <th>Vendor</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.productId}>
                                    <td>{product.productName}</td>
                                    <td>${product.price}</td>
                                    <td>{product.stockAvailability}</td>
                                    <td>{product.productClass}</td>
                                    <td>{product.vendorName}</td>
                                    <td><img src={product.imageUrl} alt={product.productName} width="50" /></td>
                                    <td>
                                        <button className="button-brops" onClick={() => handleEdit(product)}><i class="fa-solid fa-pen"></i></button>
                                        
                                        <button className="button-bropss" onClick={() => handleDelete(product.productId)}><i class="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {isModalOpen && (
                    <div>
                        <div className="overlay-bro" onClick={handleCloseModal}></div>
                        <div className="modal-bro">
                            <div className="modal-content-bro">
                                <h2>{isEditMode ? 'Edit Product' : 'Add Product'}</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="field-bro">
                                        <label className="label-bro">Name:</label>
                                        <input className="input-bro" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                                    </div>
                                    <div className="field-bro">
                                        <label className="label-bro">Stock Availability:</label>
                                        <input className="input-bro" type="number" value={stockAvailability} onChange={(e) => setStockAvailability(e.target.value)} required />
                                    </div>
                                    <div className="field-bro">
                                        <label className="label-bro">Class:</label>
                                        <input className="input-bro" type="text" value={productClass} onChange={(e) => setProductClass(e.target.value)} required />
                                    </div>
                                    <div className="field-bro">
                                        <label className="label-bro">Vendor Name:</label>
                                        <input className="input-bro" type="text" value={vendorName} onChange={(e) => setVendorName(e.target.value)} required />
                                    </div>
                                    <div className="field-bro">
                                        <label className="label-bro">Price:</label>
                                        <input className="input-bro" type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required />
                                    </div>
                                    <div className="field-bro">
                                        <label className="label-bro">Image:</label>
                                        <input className="input-bros" type="file" onChange={handleImageUpload} required={!isEditMode} />
                                        {imageUrl && <img className="product-image" src={imageUrl} alt="Product" width="100" />}
                                    </div>
                                    <button className="button-brop" type="submit">{isEditMode ? 'Update Product' : 'Add Product'}</button>
                                </form>

                                <button className="button-bros" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                )}
                {successMessage && (
                    <div className="success-popup-bro">
                        <p>{successMessage}</p>
                        <button className="button-broses" onClick={handleCloseModal}>Close</button>
                    </div>
                )}
                {errorMessage && (
                    <div className="error-popup-bro">
                        <p>{errorMessage}</p>
                        <button className="button-bros" onClick={handleCloseModal}>Close</button>
                    </div>
                )}
            </div>
    );
};

export default Product;
