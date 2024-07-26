const Order = require('../models/order');
const Sale = require('../models/sale');

// Create a new order
exports.createOrder = async (req, res) => {
    const { manufactureId, manufactureName, manufactureAddress, productName, stockAvailability, productClass, vendorName, price, imageUrl } = req.body;
    try {
        const newOrder = new Order({ manufactureId, manufactureName, manufactureAddress, productName, stockAvailability, productClass, vendorName, price, imageUrl });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single order by orderId
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.id });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (err) {
        console.error('Error fetching order:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an order
exports.updateOrder = async (req, res) => {
    const { manufactureId, manufactureName, manufactureAddress, productName, stockAvailability, productClass, vendorName, price, imageUrl } = req.body;
    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { orderId: req.params.id },
            { manufactureId, manufactureName, manufactureAddress, productName, stockAvailability, productClass, vendorName, price, imageUrl },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (err) {
        console.error('Error updating order:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({ orderId: req.params.id });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted' });
    } catch (err) {
        console.error('Error deleting order:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Dispatch an order
exports.dispatchOrder = async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate(
            { orderId: req.params.id },
            { dispatched: true },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Create a corresponding sale entry
        const newSale = new Sale({
            manufactureId: order.manufactureId,
            manufactureName: order.manufactureName,
            manufactureAddress: order.manufactureAddress,
            productName: order.productName,
            stockAvailability: order.stockAvailability,
            productClass: order.productClass,
            vendorName: order.vendorName,
            price: order.price,
            imageUrl: order.imageUrl,
            dispatched: true
        });

        await newSale.save();
        res.status(200).json({ order, sale: newSale });

    } catch (err) {
        console.error('Error dispatching order:', err);
        res.status(500).json({ message: 'Server error' });
    }
};