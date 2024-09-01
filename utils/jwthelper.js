const jwt = require("jsonwebtoken");

const verifyToken = function (token, secret) {
  return jwt.verify(token, secret);
};

const createToken = (params, secret, expiresIn) => {
  let maxAge = 3 * 24 * 60 * 60;
  if (expiresIn === undefined) {
    expiresIn = maxAge;
  }
  return jwt.sign(params, secret, {
    expiresIn: expiresIn,
  });
};

const jwtHelper = {
  verifyToken,
  createToken,
};

module.exports = jwtHelper;
