const pool = require('../config/db');

exports.getAllPerfumes = async (req, res) => {
    try {
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

exports.updatePerfume = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_marca, nombre, ml, concentracion, precio } = req.body;
        
        let query = 'UPDATE perfumes SET id_marca=?, nombre=?, ml=?, concentracion=?, precio=?';
        let params = [id_marca, nombre, ml, concentracion, precio];

        if (req.file) {
            query += ', imagen_perfume=?';
            params.push(`/uploads/${req.file.filename}`);
        }
        
        query += ' WHERE id_perfume=?';
        params.push(id);

        const [result] = await pool.query(query, params);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "El perfume especificado no existe." });
        }
        
        res.json({ message: "Perfume actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar perfume:", error);
        res.status(500).json({ error: "Error interno al actualizar el perfume" });
    }
};

exports.deletePerfume = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM perfumes WHERE id_perfume=?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "El perfume especificado no existe." });
        }
        res.json({ message: "Perfume eliminado del catálogo." });
    } catch (error) {
        console.error("Error al eliminar perfume:", error);
        res.status(500).json({ error: "Error interno al eliminar el perfume." });
    }
};
