import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";
import connectDb from "./db";

const app = express();

app.use(cors({
  origin: "*",
}));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

app.use("/", router);

app.use(function(req: Request, res: Response, next: NextFunction){
  next(new Error("404 Not Found!"));
});

app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {
  if(err) {
    res.status(404).json({
      message: "404 Not Found!"
    });
  } else {
    next();
  }
});

export default app;