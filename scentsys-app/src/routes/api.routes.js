const express = require('express');
const router = express.Router();
const marcaCtrl = require('../controllers/marca.controller');
const perfumeCtrl = require('../controllers/perfume.controller');
const upload = require('../middlewares/upload');

// Asegúrate de que marcaCtrl.getAll y marcaCtrl.create EXISTAN en tu controlador
router.get('/marcas', marcaCtrl.getAll); 
router.post('/marcas', upload.single('logo_imagen'), marcaCtrl.create);

router.get('/perfumes', perfumeCtrl.getPerfumes);
router.post('/perfumes', upload.single('imagen_perfume'), perfumeCtrl.createPerfume);

module.exports = router;
