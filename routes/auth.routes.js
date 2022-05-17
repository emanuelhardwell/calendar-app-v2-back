const { Router } = require("express");
const router = Router();

const {
  createUser,
  loginUser,
  renewToken,
} = require("../controllers/auth.controller");

// CREATE USER
router.post("/new", createUser);

// LOGIN USER
router.post("/", loginUser);

// RENEW TOKEN
router.get("/renew", renewToken);

module.exports = router;
