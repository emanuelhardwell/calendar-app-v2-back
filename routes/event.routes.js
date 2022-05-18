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
    check("start", "La fecha inicial es necesaria").isISO8601().toDate(),
    check("end", "La fecha final es necesaria").isISO8601().toDate(),
    validateFields,
  ],
  createEvent
);

router.put(
  "/:id",

  [
    check("title", "El titulo es necesario").not().isEmpty(),
    check("notes", "Las notas son necesarias").not().isEmpty(),
    check("start", "La fecha inicial es necesaria").isISO8601().toDate(),
    check("end", "La fecha final es necesaria").isISO8601().toDate(),
    validateFields,
  ],
  updateEvent
);

router.delete("/:id", deleteEvent);

module.exports = router;
