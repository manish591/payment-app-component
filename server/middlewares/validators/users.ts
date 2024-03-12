import { Request, Response, NextFunction } from "express";
import zod from "zod";

function validateSignupData(req: Request, res: Response, next: NextFunction) {
  const schema = zod.object({
    username: zod.string().min(6).max(10),
    first_name: zod.string().max(50),
    last_name: zod.string().max(50),
    email: zod.string().email(),
    password: zod.string().min(6)
  });

  try {
    const parsedData = schema.parse(req.body);
    if(parsedData) {
      next();
    }
  } catch(err){
    next(err);
  }
}

export default {
  validateSignupData,
};
