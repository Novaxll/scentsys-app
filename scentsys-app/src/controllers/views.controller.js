const path = require('path');

exports.renderMarcas = (req, res) => {
    // Esta envía la vista de Marcas
    res.sendFile(path.join(__dirname, '../views/marcas.html'));
};

exports.renderPerfumes = (req, res) => {
    // ¡AQUÍ ESTABA EL ERROR! Asegúrate de que diga perfumes.html
    res.sendFile(path.join(__dirname, '../views/perfumes.html'));
};
