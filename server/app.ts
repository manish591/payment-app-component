import express, { Request, Response, NextFunction } from "express";
import router from "./routes";

const app = express();

app.use("/", router);

app.use(function(req: Request, res: Response, next: NextFunction){
  next(new Error("404 Not Found!"));
});

app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {
  if(err) {
    res.status(500).json({
      message: err.message
    });
  } else {
    next();
  }
});

export default app;