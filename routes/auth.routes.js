const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  createUser,
  loginUser,
  renewToken,
} = require("../controllers/auth.controller");

// CREATE USER
router.post(
  "/new",
  [
    check("name", "El nombre es requerido").not().isEmpty(),
    check("email", "El email es requerido").isEmail(),
    check("password", "El password debe tener al menos 6 caracteres").isLength({
      min: 6,
    }),
    validateFields,
  ],
  createUser
);

// LOGIN USER
router.post(
  "/",
  [
    check("email", "El email es requerido").isEmail(),
    check("password", "El password debe tener al menos 6 caracteres").isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginUser
);

// RENEW TOKEN
router.get("/renew", validateJWT, renewToken);

module.exports = router;
