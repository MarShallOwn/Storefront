import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  let token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as Secret);

    next();
  } catch (err) {
    return res.status(401).json({ error: `unautherized token. Error: ${err}` });
  }
};

export default verifyAuthToken;
