import { Router } from "express";
import users from "../controllers/auth";
import validator from "../middlewares/validators/users";

const router = Router();

router.post("/signup", validator.validateSignupData, users.signup);
router.post("/login", validator.validateLoginData, users.login);
router.post("/singout", users.signout);

export default router;