const path = require('path');

exports.renderMarcas = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/marcas.html'));
};

exports.renderPerfumes = (req, res) => {
    // IMPORTANTE: Que diga perfumes.html aquí
    res.sendFile(path.join(__dirname, '../views/perfumes.html'));
};
