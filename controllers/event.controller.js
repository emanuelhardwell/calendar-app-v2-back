const { response } = require("express");
const Event = require("../models/Event.model");

const eventObject = {};

eventObject.getEvents = async (req, res = response) => {
  try {
    const events = await Event.find().populate("user", "name");

    res.status(200).json({
      ok: true,
      msg: "getEvents",
      events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contactese con el administrador",
    });
  }
};

eventObject.createEvent = async (req, res = response) => {
  try {
    const newEvent = new Event(req.body);
    newEvent.user = req.uid;

    const eventSave = await newEvent.save();

    res.status(200).json({
      ok: true,
      msg: "createEvent",
      event: eventSave,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contactese con el administrador",
    });
  }
};

eventObject.updateEvent = async (req, res = response) => {
  const id = req.params.id;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Este evento no existe",
      });
    }

    if (event.user.toJSON() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permisos para actualizar este evento",
      });
    }

    const eventUpdated = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      msg: "updateEvent",
      event: eventUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contactese con el administrador",
    });
  }
};

eventObject.deleteEvent = async (req, res = response) => {
  const id = req.params.id;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Este evento no existe",
      });
    }

    if (event.user.toJSON() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permisos para eliminar este evento",
      });
    }

    await Event.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      msg: "deleteEvent",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contactese con el administrador",
    });
  }
};

module.exports = eventObject;
