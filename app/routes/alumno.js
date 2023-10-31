const express = require("express");
const router = express.Router();
const controller = require("../controllers/alumno");

router.get('/alumnos', controller.getData);

router.post('/alumno', controller.insertData);



module.exports = router;
