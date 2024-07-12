const express = require("express");
const router = express.Router();
const controller = require("../controllers/grupo");

router.get('/grupos', controller.getData);

router.get('/grupo/:grupoId', controller.getGrupoPorId);

router.post('/grupo', controller.insertData);

router.put('/grupos/:grupoId/alumnos', controller.actualizarListaAlumnos);

router.put('/grupo/:grupoId', controller.actualizarGrupo);

router.delete('/grupo/:grupoId', controller.deleteGrupo);


module.exports = router;
