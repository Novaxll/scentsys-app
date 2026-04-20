const express = require('express');
const app = express();
const path = require('path');

// Importamos las rutas
const apiRoutes = require('./routes/api.routes');
const viewsRoutes = require('./routes/views.routes');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public'))); // Para tus assets e imágenes

// ---> AQUI ESTÁ LA MAGIA <---
// Le decimos a Express que todo lo que empiece con /api vaya al archivo api.routes.js
app.use('/api', apiRoutes); 

// Y todo lo demás (las vistas HTML) vaya a views.routes.js
app.use('/', viewsRoutes);

// Tu manejador de error 404 (el que está enviando el "No Se Encuentra")
app.use((req, res) => {
    res.status(404).send('No Se Encuentra');
});

module.exports = app;
