const pool = require('../config/db'); // O como se llame tu archivo de conexión

exports.create = async (req, res) => {
    try {
        const { nombre, pais_origen, fundacion, categoria } = req.body;
        
        // Si hay imagen, guardamos la ruta web
        const logo_imagen = req.file ? `/uploads/${req.file.filename}` : null;

        // Inserción real en la base de datos MySQL
        const [result] = await pool.query(
            'INSERT INTO marcas (nombre, pais_origen, fundacion, categoria, logo_imagen) VALUES (?, ?, ?, ?, ?)',
            [nombre, pais_origen, fundacion, categoria, logo_imagen]
        );

        res.status(201).json({ message: "Marca creada", id: result.insertId });
    } catch (error) {
        console.error("Error en DB:", error);
        res.status(500).json({ error: "Error interno al guardar en la base de datos" });
    }
};
