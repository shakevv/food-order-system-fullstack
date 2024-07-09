import express from "express";
import { createOrder, finishOrder, getAllOrders } from "../controller/orderController";
import { authenticate } from "../middleware/authMiddleware";


const router = express.Router();

router.post("/", createOrder);
router.get("/", authenticate, getAllOrders);
router.patch("/:id", authenticate, finishOrder);

export default router;