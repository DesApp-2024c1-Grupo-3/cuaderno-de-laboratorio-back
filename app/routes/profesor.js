const express = require("express");
const router = express.Router();
const controller = require("../controllers/profesor");

router.get('/profesores', controller.getData);

router.get('profesoresJson', controller.getDataJson);

router.post('/profesor', controller.insertData);

router.get('/profesor/:profesorId/cursos', controller.getCursosByProfesorId);

router.get('/profesor/:profesorId', controller.getProfesorPorId);

router.post('/profesor/:profesorId/curso/:cursoId/tp', controller.addTpToCursoByProfesorId);

// Nueva ruta para obtener TPs del cuatrimestre actual
//router.get('/profesor/:profesorId/cursos/actual/tps', profesorController.getTpsActualesByProfesorId);

// Nueva ruta para obtener TPs del cuatrimestre anterior
//router.get('/profesor/:profesorId/cursos/anterior/tps', profesorController.getTpsAnterioresByProfesorId);


module.exports = router;
