import axios from 'axios';

const API_URL = 'http://localhost:5000/api/manufacturings';

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
