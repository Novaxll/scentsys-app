const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

const marcaCtrl = require('../controllers/marca.controller');
const perfumeCtrl = require('../controllers/perfume.controller');

// Rutas de Marcas (Con nombres exactos de marca.controller.js)
router.get('/marcas', marcaCtrl.getAllMarcas);
router.post('/marcas', upload.single('logo_imagen'), marcaCtrl.createMarca);

// Rutas de Perfumes (Con nombres exactos de perfume.controller.js)
// Si necesitas obtener perfumes por marca, usamos la ruta principal pasando ?id_marca=X
router.get('/perfumes', perfumeCtrl.getAllPerfumes);
router.post('/perfumes', upload.single('imagen_perfume'), perfumeCtrl.createPerfume);

// Opcional: Ruta específica /marcas/:id/perfumes si tu frontend la usa
router.get('/marcas/:id/perfumes', async (req, res) => {
    // Reutilizamos el controlador pasándole el ID en el query
    req.query.id_marca = req.params.id;
    return perfumeCtrl.getAllPerfumes(req, res);
});

module.exports = router;
