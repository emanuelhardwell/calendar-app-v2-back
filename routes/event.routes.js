const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");

// De esta forma applicamos el Middleware validateJWT a todas nuestras rutas que estan abajo
router.use(validateJWT);

router.get("/", getEvents);

router.post(
  "/",

  [
    check("title", "El titulo es necesario").not().isEmpty(),
    check("notes", "Las notas son necesarias").not().isEmpty(),
    check("start", "La fecha inicial es necesaria").not().isEmpty(),
    check("end", "La fecha final es necesaria").not().isEmpty(),
    validateFields,
  ],
  createEvent
);

router.put(
  "/:id",

  [
    check("title", "El titulo es necesario").not().isEmpty(),
    check("notes", "Las notas son necesarias").not().isEmpty(),
    check("start", "La fecha inicial es necesaria").not().isEmpty(),
    check("end", "La fecha final es necesaria").not().isEmpty(),
    validateFields,
  ],
  updateEvent
);

router.delete("/:id", deleteEvent);

module.exports = router;
