const express = require("express");
const router = express.Router();
const controller = require("../controllers/trabajopractico");

router.get('/tps', controller.getData);

router.post('/tp', controller.insertData);

module.exports = router;
