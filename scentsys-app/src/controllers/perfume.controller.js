const pool = require('../config/db');

exports.getAllPerfumes = async (req, res) => {
    try {
        // Extraemos id_marca si viene en la query (para la vista filtrada)
        const { id_marca } = req.query;
        let query = 'SELECT * FROM perfumes';
        let params = [];

        if (id_marca) {
            query += ' WHERE id_marca = ?';
            params.push(id_marca);
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener perfumes:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.createPerfume = async (req, res) => {
    try {
        const { id_marca, nombre, ml, concentracion, precio } = req.body;
        const imagen_perfume = req.file ? `/uploads/${req.file.filename}` : null;

        const [result] = await pool.query(
            'INSERT INTO perfumes (id_marca, nombre, ml, concentracion, precio, imagen_perfume) VALUES (?, ?, ?, ?, ?, ?)',
            [id_marca, nombre, ml, concentracion, precio, imagen_perfume]
        );

        res.status(201).json({ message: "Perfume creado exitosamente", id: result.insertId });
    } catch (error) {
        console.error("Error al crear perfume:", error);
        res.status(500).json({ error: "Error interno al guardar en la base de datos" });
    }
};
