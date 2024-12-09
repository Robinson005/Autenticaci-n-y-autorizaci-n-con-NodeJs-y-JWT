const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());
connectDB();

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});