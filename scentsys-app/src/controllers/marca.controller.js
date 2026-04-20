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

exports.updateMarca = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, pais_origen, fundacion, categoria } = req.body;
        
        let query = 'UPDATE marcas SET nombre=?, pais_origen=?, fundacion=?, categoria=?';
        let params = [nombre, pais_origen, fundacion, categoria];

        // Si se subió una imagen nueva, la agregamos al update
        if (req.file) {
            query += ', logo_imagen=?';
            params.push(`/uploads/${req.file.filename}`);
        }
        
        query += ' WHERE id_marca=?';
        params.push(id);

        const [result] = await pool.query(query, params);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "La marca especificada no existe." });
        }
        
        res.json({ message: "Marca actualizada correctamente" });
    } catch (error) {
        console.error("Error al actualizar marca:", error);
        res.status(500).json({ error: "Error interno al actualizar la marca" });
    }
};

exports.deleteMarca = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM marcas WHERE id_marca=?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "La marca especificada no existe." });
        }
        res.json({ message: "Marca eliminada del directorio." });
    } catch (error) {
        console.error("Error al eliminar marca:", error);
        res.status(500).json({ error: "No se puede eliminar la marca. Verifica que no tenga perfumes asociados." });
    }
};
