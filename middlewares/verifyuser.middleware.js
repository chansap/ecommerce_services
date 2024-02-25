const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  try {
    const authHeader = req.headers.token.split(" ")[1];

    if (authHeader) {
      jwt.verify(authHeader, process.env.JWT_SCRT, (err, user) => {
        if (err) return res.status(403).json("Invalid Token");
        req.user = user;
        // Output
        // {
        //   id: '659aead955bc101f24311085',
        //   admin: true,
        //   iat: 1704743030,
        //   exp: 1705002230
        // }
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated");
    }
  } catch (err) {
    return res.status(401).json(err);
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  const uId = req.params.id;

  if (uId === req.user.id && req.user.admin) {
    next();
  } else {
    res.status(403).json("You are not allowed to do that!");
  }
};

const verifyUserAdmin = (req, res, next) => {
  if (req.user.admin) {
    next();
  } else {
    res.status(403).json("You are not a admin!");
  }
};

module.exports = {
  verifyUser,
  verifyTokenAndAuthorization,
  verifyUserAdmin,
};
