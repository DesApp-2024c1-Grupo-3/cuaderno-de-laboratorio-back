const express = require("express");
const router = express.Router();
const controller = require("../controllers/persona");

router.get('/personas', controller.getData);

router.post('/persona', controller.insertData);

module.exports = router;
