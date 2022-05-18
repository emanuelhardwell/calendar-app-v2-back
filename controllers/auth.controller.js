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

authObject.loginUser = (req, res = response) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: "User login",
  });
};

authObject.renewToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: "renew token",
  });
};

module.exports = authObject;
