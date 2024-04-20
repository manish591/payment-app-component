import { Request, Response } from "express";
import AccountModel from "../models/account.model";
import mongoose from "mongoose";

async function getBalance(req: Request, res: Response) {
  try {
    const user_id = res.locals.user_id;
    const accountDetail = await AccountModel.findOne({ user_id }).exec();

    if(!accountDetail) {
      res.status(400).json({
        message: "account doesn't exists"
      });

      return;
    }

    res.status(200).json({
      message: "Account balance returned successfully",
      balance: accountDetail.balance
    });
  } catch(err) {
    res.status(500).json({
      message: "An internal server error occured",
    });
  }
}

async function transferBalance(req: Request, res: Response) {
  const session = await mongoose.startSession();
  try {
    /**
     * create a client session
     * start a transaction
     * get to and amount from the request body
     * get main account details from res.locals.user_id
     * check if account exists or balance is greater than or equals to amount
     * if not abort the transaction and throw an error account doesn't exists
     * 
     * the find the others accounts details using the id given in the to field
     * if account doesn't exists then abort the transaction and return response saying account invalid
     * 
     * then decrease the money from the main account
     * increase the balance of the other account
     * 
     * commit the transaction
     * 
     * return the response saying transaction is successfull
     * 
     * if any error occured it will be catched in the catch block
     * abort the transaction
     * response saying transaction failed
     */

    session.startTransaction();

    const { to, amount } = req.body;
    const transferedBy = await AccountModel.findOne({ user_id: res.locals.user_id }).session(session).exec();

    if(!transferedBy) {
      session.abortTransaction();
      res.status(400).json({
        message: "Sender Account invalid"
      });

      return;
    }

    if(transferedBy.balance < amount) {
      session.abortTransaction();
      res.status(400).json({
        message: "Insuffiecient balance"
      });

      return;
    }

    const transferedTo = await AccountModel.findOne({ user_id: to }).session(session).exec();

    if(!transferedTo) {
      session.abortTransaction();
      res.status(400).json({
        message: "Receiver account invalid"
      });
    }

    await AccountModel.findOneAndUpdate({ user_id: res.locals.user_id }, { $inc: { balance: -amount } });
    await AccountModel.findOneAndUpdate({ user_id: to }, { $inc: { balance: amount } });

    session.commitTransaction();

    res.status(200).json({
      message: "Transaction successfull"
    });
  } catch(err) {
    session.abortTransaction();
    res.status(500).json({
      message: "Trasaction failed",
    });
  }
}

export default {
  getBalance,
  transferBalance
};