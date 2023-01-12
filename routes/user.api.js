const express = require("express");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.post("/", userController.createUser);
router.post("/login", userController.loginWithEmail);
router.get("/me", authController.authenticate, userController.getUser);
// router.put("/:id", userController.updateTask);
// router.delete("/:id", userController.deleteTask);

module.exports = router;
