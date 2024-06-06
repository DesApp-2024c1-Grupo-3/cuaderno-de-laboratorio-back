const express = require("express");
const router = express.Router();
const controller = require("../controllers/profesor");

router.get('/profesores', controller.getData);

router.post('/profesor', controller.insertData);

router.get('/profesor/:profesorId/cursos', controller.getCursosByProfesorId);

router.get('/profesor/:profesorId', controller.getProfesorPorId);

router.post('/profesor/:profesorId/curso/:cursoId/tp', controller.addTpToCursoByProfesorId);

//AGREGAR OBTENER NOMBRE PROFESOR POR ID
module.exports = router;
