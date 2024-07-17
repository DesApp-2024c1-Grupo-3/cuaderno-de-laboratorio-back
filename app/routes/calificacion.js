const express = require("express");
const router = express.Router();
const calificacionController = require("../controllers/calificacion");
const multer = require('multer');
const path = require('path');

// Configurar multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo
  }
});

const upload = multer({ storage });

router.post('/calificacion', upload.array('file'), calificacionController.insertData);

router.get('/calificacion/:grupoId/:tpId', calificacionController.getComAlumnByCalifId);

router.get('/calificacionIndivdual/:idEntregaAlumno/:tpId', calificacionController.getComAlumnIndByCalifId);

router.put('/calificacion/:id', calificacionController.updateCalificacion);

router.delete('/calificacion/:calificacionId', calificacionController.deleteCalificacion);

module.exports = router;
