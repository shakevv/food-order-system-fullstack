import express from "express";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controller/productController";
import { authenticate } from "../middleware/authMiddleware";


const router = express.Router();

router.get("/", getAllProducts);
router.post("/", authenticate, createProduct);
router.delete("/:id", authenticate, deleteProduct);
router.patch("/:id", authenticate, updateProduct);

export default router;