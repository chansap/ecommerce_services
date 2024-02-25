const router = require("express").Router();

const {
  authRegister,
  authLogin,
} = require("../controllers/auth.controller.js");

// Register
router.post("/register", authRegister);

// LOgin
router.post("/login", authLogin);

module.exports = router;
