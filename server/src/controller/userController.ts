import { Request, Response } from "express";
import User from "../model/User"
import { asyncHandler } from "../middleware/errorMiddleware";


export const getAllUsers = asyncHandler(async (_req: Request, res: Response) => {
    const users = await User.find({}, '_id email');
    return res.status(200).json(users);
})

export const deleteUserById = asyncHandler(async (req: Request, res: Response) => {
    await User.findByIdAndDelete(req.params['id']);
    return res.status(200).json();
})

export const updatePasswordById = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findOne({ _id: req.params['id'] });
    if (!user) {
        return res.status(500).json();
    }
    user.password = req.body.password;
    await user.save();
    return res.status(200).json();
})