const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User.model");
const { generateJWT } = require("../helpers/jwt");

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

    // generar el token
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      msg: "User created",
      uid: user.id,
      name: user.name,
      token,
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

    // generar el token
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      msg: "login successfully",
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador!!",
    });
  }
};

authObject.renewToken = async (req, res = response) => {
  const uid = req.uid;
  const name = req.name;

  try {
    // generar el token
    const token = await generateJWT(uid, name);

    res.json({
      ok: true,
      msg: "renew token",
      token,
      uid,
      name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador!!",
    });
  }
};

module.exports = authObject;
