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

async function validateEditUserProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const schema = zod.object({
      username: zod.string().optional(),
      first_name: zod.string().optional(),
      last_name: zod.string().optional()
    });

    await schema.parseAsync(req.body);
    next();
  } catch(err) {
    res.status(400).json({
      message: "invalid body"
    });
  }
}

async function validateTransactionAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const schema = zod.object({
      to: zod.string(),
      amount: zod.number(),
    });

    await schema.parseAsync(req.body);
    next();
  } catch(err) {
    res.status(200).json({
      message: "Request body invalid"
    });
  }
}

export default {
  validateSignupData,
  validateLoginData,
  validateEditUserProfile,
  validateTransactionAccount
};
