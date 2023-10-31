const express = require("express");
const router = express.Router();
const controller = require("../controllers/curso");

router.get('/cursos', controller.getData);

router.post('/curso', controller.insertData);

router.get('/curso/:cursoId/alumnos', controller.getAlumnosByCursoId);

module.exports = router;
