import { Request, Response, NextFunction } from "express";
import zod from "zod";

async function validateSignupData(req: Request, res: Response, next: NextFunction) {
  const schema = zod.object({
    username: zod.string().min(6).max(10),
    first_name: zod.string().max(50),
    last_name: zod.string().max(50),
    email: zod.string().email(),
    password: zod.string().min(6)
  });

  try {
    const parsedData = await schema.parseAsync(req.body);
    if(parsedData) {
      next();
    }
  } catch(err){
    res.status(400).json({
      message: "Invalid body provided",
    });
  }
}

export default {
  validateSignupData,
};
