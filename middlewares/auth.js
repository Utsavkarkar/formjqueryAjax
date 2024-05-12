const jwt = require("jsonwebtoken");

exports.chkToken = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (!token) return res.status(401).send("Access denied");
  try {
    jwt.verify(token, "test", (err, decodedToken) => {
      if (err) {
        return res.redirect("/login");
      } else {
        next();
      }
    });
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
