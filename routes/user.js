const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser  = new User({ name, email, password: hashedPassword, role });
    await newUser .save();
    res.status(201).json({ message: 'Usuario creado' });
});

// Autenticación de usuario
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Obtener usuarios (solo para administradores)
router.get('/', auth, async (req, res) => {
    if (req.user.role !== 'administrador') return res.status(403).json({ message: 'Acceso denegado' });
    const users = await User.find();
    res.json(users);
});

module.exports = router;