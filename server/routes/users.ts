import { Router } from "express";
import users from "../controllers/users";

const router = Router();

router.get("/", users.getUsersData);

export default router;