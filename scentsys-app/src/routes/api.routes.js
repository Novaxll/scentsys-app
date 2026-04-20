const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

const marcaCtrl = require('../controllers/marca.controller');
const perfumeCtrl = require('../controllers/perfume.controller');

// Rutas de Marcas
router.get('/marcas', marcaCtrl.getAllMarcas);
router.post('/marcas', upload.single('logo_imagen'), marcaCtrl.createMarca);
router.put('/marcas/:id', upload.single('logo_imagen'), marcaCtrl.updateMarca);
router.delete('/marcas/:id', marcaCtrl.deleteMarca);

// Rutas de Perfumes
router.get('/perfumes', perfumeCtrl.getAllPerfumes);
router.post('/perfumes', upload.single('imagen_perfume'), perfumeCtrl.createPerfume);
// Si usas el endpoint filtrado por ID
router.get('/marcas/:id/perfumes', async (req, res) => {
    req.query.id_marca = req.params.id;
    return perfumeCtrl.getAllPerfumes(req, res);
});

module.exports = router;
