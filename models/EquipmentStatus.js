const mongoose = require('mongoose');

const equipmentStatusSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EquipmentStatus', equipmentStatusSchema);