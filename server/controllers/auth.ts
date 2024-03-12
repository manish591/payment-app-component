import { Request, Response } from "express";

function signup(req: Request, res: Response) {
  res.json({
    message: "user data",
  });
}

function login(req: Request, res: Response) {
  res.json({
    message: "login router",
  });
}

function signout(req: Request, res: Response) {
  res.json({
    message: "signout"
  });
}

export default {
  signup,
  login,
  signout
};