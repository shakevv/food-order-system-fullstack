import jwt from "jsonwebtoken";
import { Response } from "express";
import dotenv from 'dotenv';


dotenv.config();

const generateToken = (res: Response, userId: string) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error('Auth problem');
    }

    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "1h",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
    });
};

const clearToken = (res: Response) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
};

export { generateToken, clearToken };