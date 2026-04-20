const Marca = require('../models/marca.model');

exports.getAll = async (req, res) => {
    try {
        const marcas = await Marca.getAll();
        res.json(marcas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { nombre, pais_origen, fundacion, categoria } = req.body;
        const logo_imagen = req.file ? `/uploads/${req.file.filename}` : null;
        // Aquí iría el INSERT a la DB
        res.status(201).json({ message: "Marca creada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
