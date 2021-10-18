const express = require('express');
const router = express.Router();
const {index} = require("../controllers/trainingPointController")

router.get("/", index);

module.exports = router;