const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const cartSchema = new mongoose.Schema({
        cartId: {
            type: Number,
            unique: true,
        },
        userName: {
            type: String,
            required: true,
        },
        zip: {
            type: Number,
            required: true,
        },
        country: {
            type: String,
        },
        state: {
            type: String,
            required:true,
        },
        phone: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    });

// Add auto-increment plugin to the schema
cartSchema.plugin(AutoIncrement, { inc_field: 'cartId' });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
