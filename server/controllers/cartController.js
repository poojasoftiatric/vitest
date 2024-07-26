import Cart from '../models/cart.js';  // Use .js extension for ES modules
// controllers/cartController.js
exports.createCart = async (req, res) => {
    const { userName, zip, country, state, phone, address, district } = req.body;
    try {
        const newCart = new Cart({ userName, zip, country, state, phone, address, district });
        const savedCart = await newCart.save();
        res.status(201).json(savedCart); // Ensure this sends the full object
    } catch (err) {
        console.error('Error creating cart:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


// Get all products
exports.getCarts = async (req, res) => {
    try {
        const cart = await Cart.find();
        res.status(200).json(cart);
    } catch (err) {
        console.error('Error fetching cart:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single product by cartId
exports.getCartById = async (req, res) => {
    try {
        const cart = await Cart.findOne({ cartId: req.params.id });
        if (!cart) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(cart);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a product
exports.updateCart = async (req, res) => {
    const { userName, zip, country, state, phone, address, district } = req.body;
    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { cartId: req.params.id },
            { userName, zip, country, state, phone, address, district },
            { new: true }
        );
        if (!updatedCart) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedCart);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a product
exports.deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ cartId: req.params.id });
        if (!cart) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
