import { Request, Response } from "express";

function getUsersData(req: Request, res: Response) {
  res.send("account data");
}

export default {
  getUsersData
};