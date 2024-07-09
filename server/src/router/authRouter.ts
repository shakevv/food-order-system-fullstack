import express, { Request, Response } from "express";
import { registerUser, authenticateUser, logoutUser } from "../controller/authController";
import { authenticate } from "../middleware/authMiddleware";


const router = express.Router();

router.post("/register", authenticate, registerUser);
router.post("/login", authenticateUser);
router.post("/logout", authenticate, logoutUser);

export default router;