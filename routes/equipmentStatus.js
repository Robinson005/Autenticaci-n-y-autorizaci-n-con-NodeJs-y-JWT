const express = require('express');
const EquipmentStatus = require('../models/EquipmentStatus');
const auth = require('../middleware/auth');

const router = express.Router();

// Crear estado de equipo
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'administrador') return res.status(403).json({ message: 'Acceso denegado' });
    const { name } = req.body;
    const newStatus = new EquipmentStatus({ name });
    await newStatus.save();
    res.status(201).json({ message: 'Estado de equipo creado', newStatus });
});

// Obtener todos los estados de equipo
router.get('/', async (req, res) => {
    const statuses = await EquipmentStatus.find();
    res.json(statuses);
});

// Obtener estado de equipo por ID
router.get('/:id', async (req, res) => {
    const status = await EquipmentStatus.findById(req.params.id);
    if (!status) return res.status(404).json({ message: 'Estado de equipo no encontrado' });
    res.json(status);
});

// Editar estado de equipo
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'administrador') return res.status(403).json({ message: 'Acceso denegado' });
    const { name } = req.body;
    const updatedStatus = await EquipmentStatus.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!updatedStatus) return res.status(404).json({ message: 'Estado de equipo no encontrado' });
    res.json({ message: 'Estado de equipo actualizado', updatedStatus });
});

// Eliminar estado de equipo
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'administrador') return res.status(403).json({ message: 'Acceso denegado' });
    const deletedStatus = await EquipmentStatus.findByIdAndDelete(req.params.id);
    if (!deletedStatus) return res.status(404).json({ message: 'Estado de equipo no encontrado' });
    res.json({ message: 'Estado de equipo eliminado' });
});

module.exports = router;