import React, { useState, useEffect } from 'react';
import { getProducts } from '../utils/api';
import { Link } from 'react-router-dom';
import '../styles/productlist.css';
import 'boxicons/css/boxicons.min.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [cartShake, setCartShake] = useState(false);

    useEffect(() => {
        fetchProducts();
        loadCart();
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

    const loadCart = () => {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(cartData);
    };

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.productId === product.productId);
        let updatedCart;
        if (existingProduct) {
            updatedCart = cart.map(item =>
                item.productId === product.productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            updatedCart = [...cart, { ...product, quantity: 1 }];
        }
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        // Handle cart animation
        setCartShake(true);
        setTimeout(() => {
            setCartShake(false);
        }, 500);
    };

    return (
        <div className="container">
            <Link to="/manufacturing/cart">
                <div id="cart" className={`cart ${cartShake ? 'shake' : ''}`} data-totalitems={cart.length}>
                    <i className='bx bx-cart'></i>
                </div>
            </Link>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <div className="product-grid">
                {products.map(product => (
                    <div className="product-card" key={product.productId}>
                        <img src={product.imageUrl} alt={product.productName} />
                        <h3>Name: {product.productName}</h3>
                        <p>Class: {product.productClass}</p>
                        <p>Quantity: {product.stockAvailability}</p>
                        <p>₹{product.price}</p>
                        <button className="button-cart" onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
