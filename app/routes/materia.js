const express = require("express");
const router = express.Router();
const controller = require("../controllers/materia");


// Ruta para obtener todas las materias
router.get('/materias', controller.getMaterias);

// Ruta para crear una nueva materia
router.post('/materia', controller.createMateria);

// Ruta para obtener los cursos asociados a una materia por su Id
router.get('/materia/:materiaId/cursos', controller.getCursosByMateriaId);


module.exports = router;

