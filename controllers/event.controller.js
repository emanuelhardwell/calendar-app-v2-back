const { response } = require("express");

const eventObject = {};

eventObject.getEvents = (req, res = response) => {
  try {
    res.status(200).json({
      ok: true,
      msg: "getEvents",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contactese con el administrador",
    });
  }
};

eventObject.createEvent = (req, res = response) => {
  try {
    res.status(200).json({
      ok: true,
      msg: "createEvent",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contactese con el administrador",
    });
  }
};

eventObject.updateEvent = (req, res = response) => {
  try {
    res.status(200).json({
      ok: true,
      msg: "updateEvent",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contactese con el administrador",
    });
  }
};

eventObject.deleteEvent = (req, res = response) => {
  try {
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
