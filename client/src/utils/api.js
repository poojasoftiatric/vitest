import axios from 'axios';


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