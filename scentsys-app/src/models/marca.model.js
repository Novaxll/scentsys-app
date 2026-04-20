const db = require('../config/db');

class Marca {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM marcas');
        return rows;
    }
    // Para simplificar esta guía, asume métodos similares para create, update, delete
}
module.exports = Marca;
