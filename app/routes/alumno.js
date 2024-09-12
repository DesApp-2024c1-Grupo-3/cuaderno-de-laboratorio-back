const express = require("express");
const router = express.Router();
const controller = require("../controllers/alumno");

router.get('/alumnos', controller.getData);

router.get('/alumnosJson', controller.getDataJson);

router.get('/alumno/:alumnoId', controller.getCursosByAlumnoId);

router.get('/alumno/:alumnoId/cursos', controller.getCursosByAlumnoIdWithAgreggate);


router.get('/alumnoSolo/:alumnoId', controller.getAlumnoById);

router.post('/alumno', controller.insertData);

router.post('/alumno/:alumnoId', controller.addTpAndCurso);

module.exports = router;
