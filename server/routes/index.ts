import { Router } from "express";
import accountRouter from "./accounts";
import authRouter from "./auth";
import userRouter from "./users";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/users", userRouter);
router.use("/api/accounts", accountRouter);

export default router;