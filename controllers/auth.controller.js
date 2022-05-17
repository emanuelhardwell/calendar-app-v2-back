const { response } = require("express");

const authObject = {};

authObject.createUser = (req, res = response) => {
  res.json({
    ok: true,
    msg: "User created",
  });
};

authObject.loginUser = (req, res = response) => {
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
