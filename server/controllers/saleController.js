const Sale = require('../models/sale');

// Create a new Sale
exports.createSale = async (req, res) => {
    const { manufactureId, manufactureName, manufactureAddress, productName, stockAvailability, productClass, vendorName, price, imageUrl } = req.body;
    try {
        const newSale = new Sale({ manufactureId, manufactureName, manufactureAddress, productName, stockAvailability, productClass, vendorName, price, imageUrl });
        await newSale.save();
        res.status(201).json(newSale);
    } catch (err) {
        console.error('Error creating Sale:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all Sales
exports.getSales = async (req, res) => {
    try {
        const sales = await Sale.find();
        res.status(200).json(sales);
    } catch (err) {
        console.error('Error fetching sales:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single sale by saleId
exports.getSaleById = async (req, res) => {
    try {
        const sale = await Sale.findOne({ saleId: req.params.id });
        if (!sale) {
            return res.status(404).json({ message: 'sale not found' });
        }
        res.status(200).json(sale);
    } catch (err) {
        console.error('Error fetching sale:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a sale
exports.updateSale = async (req, res) => {
    const { manufactureId, manufactureName, manufactureAddress, productName, stockAvailability, productClass, vendorName, price, imageUrl } = req.body;
    try {
        const updatedSale = await Sale.findOneAndUpdate(
            { saleId: req.params.id },
            { manufactureId, manufactureName, manufactureAddress, productName, stockAvailability, productClass, vendorName, price, imageUrl },
            { new: true }
        );
        if (!updatedSale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.status(200).json(updatedSale);
    } catch (err) {
        console.error('Error updating sale:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a sale
exports.deleteSale = async (req, res) => {
    try {
        const sale = await Sale.findOneAndDelete({ saleId: req.params.id });
        if (!sale) {
            return res.status(404).json({ message: 'sale not found' });
        }
        res.status(200).json({ message: 'sale deleted' });
    } catch (err) {
        console.error('Error deleting sale:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
