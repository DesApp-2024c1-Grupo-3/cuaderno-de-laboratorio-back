const express = require("express");
const router = express.Router();
//const upload = require("../config/multerConfig");
const calificacionController = require("../controllers/calificacion");
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
/* const path = require('path');

// Configurar multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo
  }
}); */

const upload = multer({ 
    storage: storage,
  fileFilter: fileFilter, });

router.post('/calificacion', upload.array('file', 10), calificacionController.insertData);

router.get('/calificacion/:grupoId/:tpId', calificacionController.getComAlumnByCalifId);

router.get('/calificacionIndivdual/:idEntregaAlumno/:tpId', calificacionController.getComAlumnIndByCalifId);

router.get('/calificacionesTp/:tpId', calificacionController.getCalificacionesByTpId);

router.get('/calificaciones/:alumnoId', calificacionController.getCalificaciones);

router.put('/calificacion/:id', calificacionController.updateCalificacion);

router.delete('/calificacion/:calificacionId', calificacionController.deleteCalificacion);

module.exports = router;
