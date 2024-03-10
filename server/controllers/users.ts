import { Request, Response } from "express";

function getUsersData(req: Request, res: Response) {
  res.json({
    message: "user data",
  });
}

export default {
  getUsersData
};
