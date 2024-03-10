import { Request, Response } from "express";

function getAccountsData(req: Request, res: Response) {
  res.send("account data");
}

export default {
  getAccountsData
};