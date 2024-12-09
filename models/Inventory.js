const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    serial: { type: String, unique: true, required: true },
    model: { type: String, unique: true, required: true },
    description: { type: String },
    imageUrl: { type: String },
    color: { type: String },
    purchaseDate: { type: Date },
    price: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
    status: { type: mongoose.Schema.Types.ObjectId, ref: 'EquipmentStatus' },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'EquipmentType' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', inventorySchema);