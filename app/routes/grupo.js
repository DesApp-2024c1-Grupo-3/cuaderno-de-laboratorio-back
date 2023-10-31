const express = require("express");
const router = express.Router();
const controller = require("../controllers/grupo");

router.get('/grupos', controller.getData);

router.post('/grupo', controller.insertData);

module.exports = router;
