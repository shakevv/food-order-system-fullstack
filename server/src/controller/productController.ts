import { Request, Response } from "express";
import { Product } from "../model/Product"
import { asyncHandler } from "../middleware/errorMiddleware";


export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
    const category = req.query['category'];
    let products;
    if (!category || category === '') {
        products = await Product.find({});
    } else {
        products = await Product.find({ category: category });
    }
    return res.status(200).json(products);
})

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const newProduct = await Product.create(req.body);
    return res.status(200).json(newProduct);
})

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const del = await Product.findByIdAndDelete({ _id: req.params['id'] });
    return res.status(200).json();
})

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const updatedProduct = await Product.findByIdAndUpdate({ _id: req.params['id'] }, req.body);
    return res.status(200).json(updatedProduct);
})