const express = require('express');
const router = express.Router();
const marcaCtrl = require('../controllers/marca.controller');
const perfumeCtrl = require('../controllers/perfume.controller');
const upload = require('../middlewares/upload');

// API Marcas
router.get('/marcas', marcaCtrl.getAll); 
router.post('/marcas', upload.single('logo_imagen'), marcaCtrl.create);

// API Perfumes
router.get('/perfumes', perfumeCtrl.getPerfumes);
router.get('/marcas/:id/perfumes', perfumeCtrl.getPerfumesByMarca);
router.post('/perfumes', upload.single('imagen_perfume'), perfumeCtrl.createPerfume);

module.exports = router;
