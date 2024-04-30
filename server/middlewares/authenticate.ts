import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

async function authenticate(req: Request, res: Response, next: NextFunction) {
  const cookies = req.cookies;

  if(!cookies["access_token"]) {
    res.status(400).json({
      message: "cookies not present",
    });
    return;
  }

  const token = cookies["access_token"];

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
    res.locals.user_id = user._id;
    next();
  } catch(err) {
    console.log(err);
    res.status(400).json({
      message: "Unauthenticated user",
    });
  }
}

export default authenticate;
