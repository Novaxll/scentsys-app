const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ruta absoluta a la carpeta de uploads
const uploadDir = path.join(__dirname, '../../public/uploads');

// ESCUDO: Si la carpeta no existe, la creamos en el acto
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); 
    },
    filename: function (req, file, cb) {
        // Limpiamos espacios y caracteres raros en el nombre de la imagen
        const safeName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '-');
        cb(null, Date.now() + '-' + safeName);
    }
});

const upload = multer({ storage: storage });
module.exports = upload;
