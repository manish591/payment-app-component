import { Router } from "express";
import accounts from "../controllers/accounts";
import authenticate from "../middlewares/authenticate";
import validator from "../middlewares/validators/users";

const router = Router();

router.get("/balance", authenticate, accounts.getBalance);
router.post("/transfer", authenticate, validator.validateTransactionAccount, accounts.transferBalance);

export default router;