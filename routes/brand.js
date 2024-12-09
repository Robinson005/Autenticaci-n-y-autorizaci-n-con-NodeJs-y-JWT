const express = require('express');
const Brand = require('../models/Brand');
const auth = require('../middleware/auth');

const router = express.Router();

// Crear marca
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'administrador') return res.status(403).json({ message: 'Acceso denegado' });
    const { name } = req.body;
    const newBrand = new Brand({ name });
    await newBrand.save();
    res.status(201).json({ message: 'Marca creada', newBrand });
});

// Obtener todas las marcas
router.get('/', async (req, res) => {
    const brands = await Brand.find();
    res.json(brands);
});

// Obtener marca por ID
router.get('/:id', async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Marca no encontrada' });
    res.json(brand);
});

// Editar marca
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'administrador') return res.status(403).json({ message: 'Acceso denegado' });
    const { name } = req.body;
    const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!updatedBrand) return res.status(404).json({ message: 'Marca no encontrada' });
    res.json({ message: 'Marca actualizada', updatedBrand });
});

// Eliminar marca
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'administrador') return res.status(403).json({ message: 'Acceso denegado' });
    const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
    if (!deletedBrand) return res.status(404).json({ message: 'Marca no encontrada' });
    res.json({ message: 'Marca eliminada' });
});

module.exports = router;