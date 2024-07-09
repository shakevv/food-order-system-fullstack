import { Request, Response } from "express";
import User from "../model/User";
import { generateToken, clearToken } from "../utils/auth";
import { asyncHandler } from "../middleware/errorMiddleware";


const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: "The user already exists" });
    }

    const user = await User.create({
        email,
        password,
    });

    if (user) {
        res.status(201).json();
    } else {
        res.status(400).json({ message: "An error occurred while creating the user" });
    }
})

const authenticateUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
        generateToken(res, user._id as string);
        res.status(200).json({
            _id: user._id,
            email: user.email,
        });
    } else {
        res.status(401).json({ message: "User not found / password incorrect" });
    }
})

const logoutUser = asyncHandler((_req: Request, res: Response) => {
    clearToken(res);
    res.status(200).json({ message: "User logged out" });
})

export { registerUser, authenticateUser, logoutUser };