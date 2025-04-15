import { Router } from "express";
import { register, userDetails } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.get("/my", isAuthenticated, userDetails);

export default router;
