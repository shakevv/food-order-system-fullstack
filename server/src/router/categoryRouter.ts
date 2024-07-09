import express from "express";
import { createCategory, deleteCategoryById, getAllCategories } from "../controller/categoryController";
import { authenticate } from "../middleware/authMiddleware";


const router = express.Router();

router.get("/", getAllCategories);
router.post("/", authenticate, createCategory);
router.delete("/:id", authenticate, deleteCategoryById);

export default router;