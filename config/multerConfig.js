// multerConfig.js
const multer = require('multer');

// Definir almacenamiento en memoria
const storage = multer.memoryStorage();

// Definir filtro de archivos para validar tipos MIME permitidos
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    // Agrega otros tipos MIME que necesites permitir
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Acepta el archivo
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se aceptan PDF, JPG, PNG y DOCX.'), false); // Rechaza el archivo
  }
};

// Configurar multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
