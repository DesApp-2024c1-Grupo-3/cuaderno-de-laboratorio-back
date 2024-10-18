const express = require("express");
const router = express.Router();
const upload = require("../../config/multerConfig");
const calificacionController = require("../controllers/calificacion");

router.post('/calificacion', upload.array('file', 10), calificacionController.insertData);

router.get('/calificacion/:grupoId/:tpId', calificacionController.getComAlumnByCalifId);

router.get('/calificacionIndivdual/:idEntregaAlumno/:tpId', calificacionController.getComAlumnIndByCalifId);

router.get('/calificacionesTp/:tpId', calificacionController.getCalificacionesByTpId);

router.get('/calificaciones/:alumnoId', calificacionController.getCalificaciones);

router.put('/calificacion/:id', calificacionController.updateCalificacion);

router.delete('/calificacion/:calificacionId', calificacionController.deleteCalificacion);

module.exports = router;
