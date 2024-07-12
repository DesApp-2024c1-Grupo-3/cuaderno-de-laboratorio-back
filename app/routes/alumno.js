const express = require("express");
const router = express.Router();
const controller = require("../controllers/alumno");

router.get('/alumnos', controller.getData);

router.get('/alumno/:alumnoId', controller.getCursosByAlumnoId);

router.get('/alumno/:dni', controller.getIdAlumnoByDNI);

router.get('/alumnoSolo/:alumnoId', controller.getAlumnoById);

router.post('/alumno', controller.insertData);

router.post('/alumno/:alumnoId', controller.addTpAndCurso);

module.exports = router;
