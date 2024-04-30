import { Request, Response } from "express";
import UserModel from "../models/user.models";

async function getSelfData(req: Request, res: Response) {
  try {
    const user_id = res.locals.user_id;
    const userData = await UserModel.findOne({ _id: user_id }, "first_name last_name username").exec();

    if(!userData) {
      res.status(400).json({
        message: "User doesn't exist"
      });

      return;
    }

    res.status(200).json({
      message: "Data found successfully",
      userData
    });

  } catch(err) {
    res.status(500).json({
      message: "An internal server error occured",
    });
  }
}

async function getAllUsers(req: Request, res: Response) {
  try {
    const searchQuery = req.query.searchQuery || "";
    const usersData = await UserModel.find({ username: { $regex: searchQuery, $options: "i" } }).exec();

    const userFilteredData = usersData.map(user => ({
      first_name: user.first_name,
      last_name: user.last_name,
      _id: user._id,
      username: user.username
    })).filter(user => user._id != res.locals.user_id);

    res.status(200).json({
      message: "Users returned successfully",
      data: userFilteredData
    });

  } catch(err) {
    res.status(500).json({
      message: "An internal server error occured",
    });
  }
}

async function updateUserDetails(req: Request, res: Response) {
  try {
    const dataToUpdate = req.body;
    const user_id = res.locals.user_id;

    const userData = await UserModel.findOneAndUpdate({ _id: user_id }, dataToUpdate).exec();

    if(!userData) {
      res.status(400).json({
        message: "No user found"
      });
    }

    res.status(200).json({
      message: "Successfully update the user profile"
    });
  } catch(err) {
    res.status(500).json({
      message: "An internal server error occured",
    });
  }
}

export default {
  getSelfData,
  getAllUsers,
  updateUserDetails
};