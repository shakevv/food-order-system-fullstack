import express from 'express';
import { getAllUsers, deleteUserById, updatePasswordById } from '../controller/userController';
import { authenticate } from '../middleware/authMiddleware';


const router = express.Router();

router.get("/", getAllUsers);
router.delete("/:id", authenticate, deleteUserById);
router.patch("/:id", authenticate, updatePasswordById)

export default router;
