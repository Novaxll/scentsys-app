const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/views.controller');

// Redirección de la raíz a marcas
router.get('/', (req, res) => {
    res.redirect('/marcas');
});

// Rutas de las vistas
router.get('/marcas', viewsController.renderMarcas);
router.get('/perfumes', viewsController.renderPerfumes);

module.exports = router;
