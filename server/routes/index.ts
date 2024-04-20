import { Router } from "express";
import accountRouter from "./accounts";
import authRouter from "./auth";
import userRouter from "./users";
import healthCheckRouter from "./healthcheck";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/users", userRouter);
router.use("/api/accounts", accountRouter);
router.use("/api", healthCheckRouter);

export default router;