import jwt from "jsonwebtoken";

export const authorization = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "This-is-my-jwt-secret");

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token or token not provided.",
    });
  }
};
