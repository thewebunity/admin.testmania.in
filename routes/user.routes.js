const express = require("express");
const { authenticateToken } = require("../middleware/authenticate");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.get("/", authenticateToken, userController.getUsers);

router.get("/:id", authenticateToken, userController.getUser);

router.post("/add", userController.addUser);

router.put("/edit", authenticateToken, userController.editUser);

router.post("/create-superadmin", userController.createSuperAdmin);

module.exports = router;
