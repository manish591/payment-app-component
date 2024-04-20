import { Router } from "express";
import users from "../controllers/users";
import authenticate from "../middlewares/authenticate";
import validator from "../middlewares/validators/users";

const router = Router();

router.get("/self", authenticate, users.getSelfData);
router.get("/", authenticate, users.getAllUsers);
router.post("/", authenticate, validator.validateEditUserProfile, users.updateUserDetails);

export default router;