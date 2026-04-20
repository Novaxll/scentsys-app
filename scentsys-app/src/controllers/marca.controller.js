const pool = require('../config/db');

exports.getAllMarcas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM marcas');
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener marcas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.createMarca = async (req, res) => {
    try {
        const { nombre, pais_origen, fundacion, categoria } = req.body;
        
        // Si hay imagen, guardamos la ruta web
        const logo_imagen = req.file ? `/uploads/${req.file.filename}` : null;

        const [result] = await pool.query(
            'INSERT INTO marcas (nombre, pais_origen, fundacion, categoria, logo_imagen) VALUES (?, ?, ?, ?, ?)',
            [nombre, pais_origen, fundacion, categoria, logo_imagen]
        );

        res.status(201).json({ message: "Marca creada exitosamente", id: result.insertId });
    } catch (error) {
        console.error("Error al crear marca:", error);
        res.status(500).json({ error: "Error interno al guardar en la base de datos" });
    }
};
