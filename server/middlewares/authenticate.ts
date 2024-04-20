import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";

async function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const cookies = req.cookies;

  if(!cookies) {
    res.status(400).json({
      message: "cookies not present",
    });
    return;
  }

  if(!authHeader) {
    res.status(400).json({
      message: "Please provide correct headers",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
    res.locals.user_id = user._id;
    next();
  } catch(err) {
    if(err instanceof TokenExpiredError) {
      const refresh_token = req.cookies["refresh_token"];

      if(!refresh_token) {
        res.status(403).json({
          message: "cookies not present"
        });
      } else {
        const decodedRefreshToken = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;
        const refreshTokenTtl = decodedRefreshToken.exp;
  
        if(refreshTokenTtl && refreshTokenTtl > Math.floor(Date.now() / 1000)) {
          const newToken = jwt.sign({_id: decodedRefreshToken._id}, process.env.ACCESS_TOKEN_SECRET!);
  
          res.cookie("access_token", newToken, {
            httpOnly: true,
            secure: true
          });
  
          res.locals.user_id = decodedRefreshToken._id;

          next();
  
        } else {
          res.status(400).json({
            message: "Unauthenticated user",
          });
        }
      }
    } else {
      res.status(400).json({
        message: "Unauthenticated user",
      });
    }
  }
}

export default authenticate;
