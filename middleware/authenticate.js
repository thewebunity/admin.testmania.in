const { auth } = require("./firebaseConfig");

const authenticateToken = async (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log(`No token provided ${authHeader}`);
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = {
      id: decodedToken.uid,
      name: decodedToken.name,
    };
    res.locals = {
      ...res.locals,
      uid: decodedToken.uid,
      name: decodedToken.name,
      email: decodedToken.email,
    };
    console.log(
      `Firebase verifyIDToken res.locals ${JSON.stringify(res.locals, null, 4)}`
    );
    next();
  } catch (err) {
    console.log(`Error while authenticating token :========> ${err.message}`);
    return res.status(403).json({ message: "Access denied. Invalid token." });
  }
};

const getToken = (req) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  return token;
};

module.exports = { authenticateToken, getToken };
