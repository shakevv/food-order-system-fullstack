import { Request, Response } from "express";
import { Order } from "../model/Order"
import { asyncHandler } from "../middleware/errorMiddleware";


export const createOrder = asyncHandler(async (req: Request, res: Response) => {
    const newOrder = await Order.create(req.body);
    return res.status(201).json(newOrder);
})

export const getOrderById = asyncHandler(async (req: Request, res: Response) => {
    const order = await Order.findById(req.params['id']);
    return res.status(200).json(order);
})

export const getAllOrders = asyncHandler(async (_req: Request, res: Response) => {
    const orders = (await Order.find({})).reverse();
    return res.status(200).json(orders);
})

export const finishOrder = asyncHandler(async (req: Request, res: Response) => {
    await Order.findOneAndUpdate({ _id: req.params['id'] }, { status: 'Finished' });
    return res.status(200).json();
})