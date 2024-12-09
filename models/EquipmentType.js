const mongoose = require('mongoose');

const equipmentTypeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EquipmentType', equipmentTypeSchema);