const express = require('express');
const app = express();
const path = require('path');

// 1. Importaciones de rutas
const apiRoutes = require('./routes/api.routes');
const viewsRoutes = require('./routes/views.routes');

// 2. Middlewares (Configuración básica)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Tus rutas actuales
app.use('/api', apiRoutes);
app.use('/', viewsRoutes);

// HOTFIX: Manejador de errores estricto para la API (Evita que el Frontend reciba HTML y rompa JSON.parse)
app.use('/api', (err, req, res, next) => {
    console.error("API Error:", err);
    res.status(500).json({ error: "Error interno del servidor", detalle: err.message });
});

// Manejador 404
app.use((req, res) => {
    res.status(404).send('No Se Encuentra');
});

module.exports = app;
