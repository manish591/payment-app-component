import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.models";
import AccountModel from "../models/account.model";
import bcrypt from "../utils/bcrypt";


async function signup(req: Request, res: Response) {
  const { username, email, password, first_name, last_name } = req.body;

  try {
    const userData = await UserModel.find({ $or: [{username: username}, {email: email}] }).exec();

    if(userData.length) {
      res.status(400).json({
        message: "User with username or email already exists",
      });

      return;
    }

    const hashedPassword = await bcrypt.hashPassword(password);

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      first_name,
      last_name
    });

    await AccountModel.create({
      user_id: user._id,
      balance: Math.floor(Math.random() * 10000 + 1),
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

async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const user = await UserModel.find({ username }).exec();

    if(!user.length) {
      res.status(400).json({
        message: "Username is not valid",
      });

      return;
    }

    const isPasswordCorrect = await bcrypt.comparePassword(password, user[0].password);

    if(!isPasswordCorrect) {
      res.status(400).json({
        message: "Password is incorrect"
      });

      return;
    }

    const userData = {
      _id: user[0]._id,
      username: user[0].username,
      first_name: user[0].first_name,
      last_name: user[0].last_name
    };

    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      message: "User successfully logged In",
      token: accessToken
    });

  } catch(err) {
    res.status(500).json({
      message: "An server side error occured!",
    });
  }
}

function signout(req: Request, res: Response) {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: true
  });
  res.status(200).json({
    message: "Logout successfully",
  });
}

export default {
  signup,
  login,
  signout
};