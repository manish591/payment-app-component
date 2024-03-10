import { Router } from "express";
import userRouter from "./users";
import accountRouter from "./accounts";

const router = Router();

router.use("/api/users", userRouter);
router.use("/api/accounts", accountRouter);

export default router;