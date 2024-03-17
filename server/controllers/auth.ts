import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.models";
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

    await UserModel.create({
      username,
      email,
      password: hashedPassword,
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

    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: 3600 });
    const refreshToken = jwt.sign({ _id: user[0]._id }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: 18000 });

    await UserModel.findOneAndUpdate({ _id: user[0]._id }, { refresh_token: refreshToken });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
    });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true
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

  res.clearCookie("refresh_token", {
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