const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const authenticateUser = (req, res, next) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.jwt;

    if (!token) {
      res.status(401).json({ message: "Please log in to continue" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = { authenticateUser };
