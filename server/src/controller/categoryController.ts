import { Request, Response } from "express";
import { Category } from "../model/Category";
import { asyncHandler } from "../middleware/errorMiddleware";


export const getAllCategories = asyncHandler(async (_req: Request, res: Response) => {
    const categories = await Category.find({});
    return res.status(200).json(categories);
})

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
    const newCategory = await Category.create(req.body);
    return res.status(201).json(newCategory);
})

export const deleteCategoryById = asyncHandler(async (req: Request, res: Response) => {
    await Category.findByIdAndDelete({ _id: req.params['id'] });
    return res.status(200).json();
})