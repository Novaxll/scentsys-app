const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Localizamos la carpeta public/uploads
const uploadDir = path.join(__dirname, '../../public/uploads');

// ESCUDO: Si la carpeta no existe, la creamos al encender el server
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
module.exports = upload;
