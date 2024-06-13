const express = require("express");
const router = express.Router();
const calificacionController = require("../controllers/calificacion");

router.post('/calificacion', calificacionController.createCalificacion);

module.exports = router;