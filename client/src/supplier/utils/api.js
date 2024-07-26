
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const register = async (userData) => {
    const res = await axios.post(`${API_URL}/register`, userData);
    return res.data;
};

export const login = async (userData) => {
    const res = await axios.post(`${API_URL}/login`, userData);
    return res.data;
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

export const dispatchOrder = async (id) => {
    try {
        const res = await axios.patch(`${ORDER_API_URL}/${id}/dispatch`);
        return res.data;
    } catch (error) {
        console.error('Error dispatching order:', error);
        throw error;
    }
};


const SALES_API_URL = 'http://localhost:5000/api/sales';

export const createSale = async (sale) => {
    const response = await axios.post(SALES_API_URL, sale);
    return response.data;
};

export const getSales = async () => {
    const response = await axios.get(SALES_API_URL);
    return response.data;
};

export const updateSale = async (salesId, sale) => {
    const response = await axios.put(`${SALES_API_URL}/${salesId}`, sale);
    return response.data;
};

export const deleteSale = async (salesId) => {
    const response = await axios.delete(`${SALES_API_URL}/${salesId}`);
    return response.data;
};
