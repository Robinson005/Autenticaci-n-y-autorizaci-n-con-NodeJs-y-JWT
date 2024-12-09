const express = require('express');
const EquipmentType = require('../models/EquipmentType');
const auth = require('../middleware/auth');

const router = express.Router();

// Crear tipo de equipo
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'administrador') return res.status(403).json({ message: 'Acceso denegado' });
    const { name } = req.body;
    const newType = new EquipmentType({ name });
    await newType.save();
    res.status(201).json({ message: 'Tipo de equipo creado', newType });
});

// Obtener todos los tipos de equipo
router.get('/', async (req, res) => {
    const types = await EquipmentType.find();
    res.json(types);
});

// Obtener tipo de equipo por ID
router.get('/:id', async (req, res) => {
    const type = await EquipmentType.findById(req.params.id);
    if (!type) return res.status(404).json({ message: 'Tipo de equipo no encontrado' });
    res.json(type);
});

// Editar tipo de equipo
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'administrador') return res.status(403).json({ message: 'Acceso denegado' });
    const { name } = req.body;
    const updatedType = await EquipmentType.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!updatedType) return res.status(404).json({ message: 'Tipo de equipo no encontrado' });
    res.json({ message: 'Tipo de equipo actualizado', updatedType });
});

// Eliminar tipo de equipo
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'administrador') return res.status(403).json({ message: 'Acceso denegado' });
    const deletedType = await EquipmentType.findByIdAndDelete(req.params.id);
    if (!deletedType) return res.status(404).json({ message: 'Tipo de equipo no encontrado' });
    res.json({ message: 'Tipo de equipo eliminado' });
});

module.exports = router;