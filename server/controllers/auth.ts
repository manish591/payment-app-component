import { Request, Response } from "express";
import UserModel from "../models/user.models";

async function signup(req: Request, res: Response) {
  const { username, email, password, first_name, last_name } = req.body;

  try {
    const userData = await UserModel.find({ username }).exec();

    if(userData.length) {
      res.status(400).json({
        message: "User with username or email already exists",
      });

      return;
    }

    await UserModel.create({
      username,
      email,
      password,
      first_name,
      last_name
    });

    res.status(200).json({
      message: "Successfully Registered!"
    });

  } catch(err) {
    res.status(500).json({
      message: "An server side error occured!",
    });
  }
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