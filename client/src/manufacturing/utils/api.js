import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getCarts = async () => {
    try {
        const response = await axios.get(`${API_URL}/cart`);
        return response.data;
    } catch (error) {
        console.error('Error fetching carts:', error);
        throw error;
    }
};

export const createCart = async (cart) => {
    try {
        const response = await axios.post(`${API_URL}/cart`, cart);
        return response.data;
    } catch (error) {
        console.error('Error creating cart:', error);
        throw error;
    }
};

export const updateCart = async (id, cart) => {
    try {
        const response = await axios.put(`${API_URL}/cart/${id}`, cart);
        return response.data;
    } catch (error) {
        console.error('Error updating cart:', error);
        throw error;
    }
};

export const deleteCart = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/cart/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting cart:', error);
        throw error;
    }
};

const PRODUCT_API_URL = 'http://localhost:5000/api/products';

export const getProducts = async () => {
    const res = await axios.get(PRODUCT_API_URL);
    return res.data;
};

export const createProduct = async (product) => {
    const res = await axios.post(PRODUCT_API_URL, product);
    return res.data;
};

export const updateProduct = async (id, product) => {
    const res = await axios.put(`${PRODUCT_API_URL}/${id}`, product);
    return res.data;
};

export const deleteProduct = async (id) => {
    const res = await axios.delete(`${PRODUCT_API_URL}/${id}`);
    return res.data;
};


const ORDER_API_URL = 'http://localhost:5000/api/orders';

export const createOrder = async (order) => {
    const response = await axios.post(ORDER_API_URL, order);
    return response.data;
};

export const getOrders = async () => {
    const response = await axios.get(ORDER_API_URL);
    return response.data;
};

export const updateOrder = async (orderId, order) => {
    const response = await axios.put(`${ORDER_API_URL}/${orderId}`, order);
    return response.data;
};

export const deleteOrder = async (orderId) => {
    const response = await axios.delete(`${ORDER_API_URL}/${orderId}`);
    return response.data;
};