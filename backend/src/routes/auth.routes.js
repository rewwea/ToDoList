const express = require("express");
const { verifyJwt } = require("../middleware/auth.middleware");
const { registerUser, loginUser } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
