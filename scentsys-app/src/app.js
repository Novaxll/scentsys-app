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

// 3. Rutas principales (El orden importa)
app.use('/api', apiRoutes);
app.use('/', viewsRoutes);

// 4. Manejador 404 (Atrapa todo lo que no coincidió arriba)
app.use((req, res) => {
    res.status(404).send('No Se Encuentra. La ruta no existe en Express.');
});

module.exports = app;
