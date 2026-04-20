const path = require('path');

exports.renderMarcas = (req, res) => {
    // Usamos path.join para asegurar que la ruta sea correcta en Linux/Docker
    const file = path.join(__dirname, '../views/marcas.html');
    console.log("Intentando enviar archivo:", file); // Esto saldrá en tus logs de Docker
    res.sendFile(file);
};

exports.renderPerfumes = (req, res) => {
    const file = path.join(__dirname, '../views/perfumes.html');
    res.sendFile(file);
};
