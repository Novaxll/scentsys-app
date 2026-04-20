const db = require('../config/db');

class Perfume {
    static async getAll(id_marca = null) {
        let query = 'SELECT p.*, m.nombre as nombre_marca FROM perfumes p JOIN marcas m ON p.id_marca = m.id_marca';
        const params = [];
        if (id_marca) {
            query += ' WHERE p.id_marca = ?';
            params.push(id_marca);
        }
        const [rows] = await db.query(query, params);
        return rows;
    }
}
module.exports = Perfume;
