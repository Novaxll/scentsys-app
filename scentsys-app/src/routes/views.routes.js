const express = require('express');
const router = express.Router();
const viewsCtrl = require('../controllers/views.controller');

router.get('/marcas', viewsCtrl.renderMarcas);
router.get('/perfumes', viewsCtrl.renderPerfumes);

module.exports = router;
