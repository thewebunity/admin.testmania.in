const express = require("express");
const { authenticateToken } = require("../middleware/authenticate");
const dashboardController = require("../controllers/dashboard.controller");

const router = express.Router();

router.get(`/`, authenticateToken, dashboardController.getData);

module.exports = router;
