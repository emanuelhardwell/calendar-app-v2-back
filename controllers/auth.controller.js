const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User.model");

const authObject = {};

authObject.createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Este correo ya esta en uso!!",
      });
    }

    user = new User(req.body);
    // encriptar el password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json({
      ok: true,
      msg: "User created",
      uid: user._id,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador!!",
    });
  }
};

authObject.loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Este usuario no existe",
      });
    }

    // comparar password
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        ok: false,
        msg: "La contraseña es incorrecta",
      });
    }

    res.json({
      ok: true,
      msg: "login successfully",
      uid: user._id,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador!!",
    });
  }
};

authObject.renewToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: "renew token",
  });
};

module.exports = authObject;
