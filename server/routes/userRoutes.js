const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");
const auth = require("../middleware/auth");

//REGISTER
router.post("/register",controller.registerUser
);

//LOGIN
router.post("/login", controller.loginUser);

//GetAllUsers
// router.get("/getAllUsers", controller.getAllUsers);
// router.get("/getAllPosts/:id", controller.getAllUserPosts);

module.exports = router;