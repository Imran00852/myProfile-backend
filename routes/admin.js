import { Router } from "express";
import { getAllUsers, login, searchUsers } from "../controllers/admin.js";

const router = Router();

router.post("/login", login);
router.get("/users", getAllUsers);
router.get("/search", searchUsers);

export default router;
