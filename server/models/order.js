const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        unique: true,
    },
    manufactureId: { type: String, required: true },
    manufactureName: { type: String, required: true },
    manufactureAddress: { type: String, required: true },
    productName: { type: String, required: true },
    stockAvailability: { type: Number, required: true },
    productClass: { type: String, required: true },
    vendorName: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    dispatched: { type: Boolean, default: false },
}, { timestamps: true });

orderSchema.plugin(AutoIncrement, { inc_field: 'orderId' });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
