const jwt = require("jsonwebtoken");
const { response } = require("express");

const validateJWT = (req = response, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Token not found un the request",
    });
  }

  try {
    const tokenVerify = jwt.verify(token, process.env.SECRET_JWT);
    console.log(tokenVerify);

    req.uid = tokenVerify.uid;
    req.name = tokenVerify.name;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Token invalid",
    });
  }
};

module.exports = { validateJWT };
