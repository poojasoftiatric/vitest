const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const supplier = mongoose.model('supplier', supplierSchema);

module.exports = supplier;
