import { Router } from "express";
import accounts from "../controllers/accounts";

const router = Router();

router.get("/", accounts.getAccountsData);

export default router;