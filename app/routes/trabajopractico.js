const express = require("express");
const router = express.Router();
const controller = require("../controllers/trabajopractico");

router.get('/tps', controller.getData);

router.post('/tp', controller.insertData);

router.get('/tp/:tpId/grupos', controller.getGruposByTpId);

router.put('/tp/:tpId/grupos/:grupoId', controller.updateAlumnosEnGrupo);

router.delete('/tp/:tpId', controller.deleteTp);

router.get('/tps', controller.getData);

router.get('/tps/:tpId', controller.getTpId);

router.put('/tp/:tpId', controller.updateTp);

module.exports = router;
