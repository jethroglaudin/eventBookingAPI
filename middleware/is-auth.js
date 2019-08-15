const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // this sees if theres is an authorization field within the incoming request
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  // split auth header on the white space
  const token = authHeader.split(" ")[1]; // bearer token
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    // decoded token
    decodedToken = jwt.verify(token, "somesupersecretkey");
  } catch (err) {
    req.isAuth = false;
    return next;
  }

  if(!decodedToken){
      req.isAuth = false;
      return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
