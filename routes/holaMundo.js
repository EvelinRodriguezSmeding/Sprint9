const express = require("express");

const { holaMundo } = require("../controllers/holaMundo");

const router = express.Router();

router.get("/holaMundo", holaMundo);

module.exports = router;
