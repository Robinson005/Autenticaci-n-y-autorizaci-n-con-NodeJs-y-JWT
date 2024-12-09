const express = require('express');
const Inventory = require('../models/Inventory');
const auth = require('../middleware/auth');

const router = express.Router();

// Crear inventario
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'administrador') return res.status(403).json({ message: 'Acceso denegado' });
    const { equipmentId, quantity } = req.body;
    const newInventory = new Inventory({ equipmentId, quantity });
    await newInventory.save();
    res.status(201).json({ message: 'Inventario creado', newInventory });
});

// Obtener todos los inventarios
router.get('/', async (req, res) => {
    const inventories = await Inventory.find().populate('equipmentId');
    res.json(inventories);
});

// Obtener inventario por ID
router.get('/:id', async (req, res) => {
    const inventory = await Inventory.findById(req.params.id).populate('equipmentId');
    if (!inventory) return res.status(404).json({ message: 'Inventario no encontrado' });
    res.json(inventory);
});

// Editar inventario
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'administrador') return res.status(403).json({ message: 'Acceso denegado' });
    const { equipmentId, quantity } = req.body;
    const updatedInventory = await Inventory.findByIdAndUpdate(req.params.id, { equipmentId, quantity }, { new: true });
    if (!updatedInventory) return res.status(404).json({ message: 'Inventario no encontrado' });
    res.json({ message: 'Inventario actualizado', updatedInventory });
});

// Eliminar inventario
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'administrador') return res.status(403).json({ message: 'Acceso denegado' });
    const deletedInventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedInventory) return res.status(404).json({ message: 'Inventario no encontrado' });
    res.json({ message: 'Inventario eliminado' });
});

module.exports = router;