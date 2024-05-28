const express = require("express");
const router = express.Router();
const controller = require("../controllers/curso");

router.get('/cursos', controller.getData);

router.post('/curso', controller.insertData);

// Ruta para obtener la información del curso por ID
router.get('/curso/:id', controller.getCursoById);

router.get('/curso/:cursoId/alumnos', controller.getAlumnosByCursoId);

router.get("/curso/:cursoId/tps", controller.getTpsByCursoId);

router.get("/curso/:cursoId/grupos", controller.getGruposByCursoId);

router.post('/grupos/:cursoId', controller.createGrupoForCurso);


module.exports = router;
