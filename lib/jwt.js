const jwt = require("jsonwebtoken");
const SECRET = "jefsnjsqiuHJBDSHJBjzidqs";

const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      lastname: user.lastname,
      firstname: user.firstname,
      isAdmin: user.isAdmin
    },
    SECRET,
    {
      expiresIn: "1d",
      algorithm: "HS256",
    }
  );
};

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, SECRET);
    return payload;
  } catch (e) {
    return null;
  }
};

module.exports = {
  createToken,
  verifyToken,
};