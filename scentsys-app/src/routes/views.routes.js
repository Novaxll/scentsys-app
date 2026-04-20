const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/views.controller');

router.get('/marcas', viewsController.renderMarcas);
router.get('/perfumes', viewsController.renderPerfumes);

// Redirección: Si alguien entra a la raíz "/", lo mandamos a "/marcas"
router.get('/', (req, res) => {
    res.redirect('/marcas');
});

module.exports = router;
