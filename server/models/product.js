const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema({
    productId: {
        type: Number,
        unique: true,
    },
    productName: {
        type: String,
        required: true,
    },
    stockAvailability: {
        type: Number,
        required: true,
    },
    productClass: {
        type: String,
    },
    vendorName: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Add auto-increment plugin to the schema
productSchema.plugin(AutoIncrement, { inc_field: 'productId' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
