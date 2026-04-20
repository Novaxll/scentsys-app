const Perfume = require('../models/perfume.model');

exports.getPerfumes = async (req, res) => {
    try {
        const perfumes = await Perfume.getAll();
        res.json(perfumes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPerfumesByMarca = async (req, res) => {
    try {
        const perfumes = await Perfume.getAll(req.params.id);
        res.json(perfumes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createPerfume = async (req, res) => {
    try {
        const { id_marca, nombre, ml, concentracion, precio } = req.body;
        const imagen = req.file ? `/uploads/${req.file.filename}` : null;
        // Aquí llamarías a tu modelo para insertar (Fase 4.3)
        res.status(201).json({ message: "Perfume creado con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
