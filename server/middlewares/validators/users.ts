import { Request, Response, NextFunction } from "express";
import zod, { ZodError } from "zod";

async function validateSignupData(req: Request, res: Response, next: NextFunction) {
  const schema = zod.object({
    username: zod.string().min(6).max(10),
    first_name: zod.string().max(50),
    last_name: zod.string().max(50),
    email: zod.string().email(),
    password: zod.string().min(6)
  });

  try {
    await schema.parseAsync(req.body);
    next();
  } catch(err){
    if(err instanceof ZodError) {
      res.status(400).json({
        message: "Invalid body provided",
      });
      return;
    }

    res.status(500).json({
      message: "An internal server error occured",
    });
  }
}

async function validateLoginData(req: Request, res: Response, next: NextFunction) {
  const schema = zod.object({
    username: zod.string().min(6).max(10),
    password: zod.string().min(6),
  });

  try {
    await schema.parseAsync(req.body);
    next();
  } catch(err) {
    if(err instanceof ZodError) {
      res.status(400).json({
        message: "Invalid body provided",
      });
      return;
    }

    res.status(500).json({
      message: "An internal server error occured",
    });
  }
}

export default {
  validateSignupData,
  validateLoginData,
};
