import Product from '../models/product.js';

// Create a new product
export const createProduct = async (req, res) => {
    const { productName, stockAvailability, productClass, vendorName, price, imageUrl } = req.body;
    try {
        const newProduct = new Product({ productName, stockAvailability, productClass, vendorName, price, imageUrl });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single product by productId
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ productId: req.params.id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a product
// Update a product
export const updateProduct = async (req, res) => {
    const { productName, stockAvailability, productClass, vendorName, price, imageUrl } = req.body;
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: req.params.id }, // Assuming you're using MongoDB's _id as the product identifier
            { productName, stockAvailability, productClass, vendorName, price, imageUrl },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id }); // Assuming you're using MongoDB's _id
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
