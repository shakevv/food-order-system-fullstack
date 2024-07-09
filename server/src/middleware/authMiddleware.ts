import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../model/User";
import asyncHandler from "express-async-handler";
import { clearToken } from "../utils/auth";
import { AuthenticationError } from "../exception/exception";
import dotenv from 'dotenv';


dotenv.config();

const authenticate = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error('Auth problem');
        }

        try {
            let token = req.cookies.jwt;
            console.log('token is: ', token);

            if (!token) {
                throw new AuthenticationError("Token not found");
            }

            const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

            if (!decoded || !decoded.userId) {
                throw new AuthenticationError("UserId not found");
            }

            const user = await User.findById(decoded.userId, "_id email");

            if (!user) {
                throw new AuthenticationError("User not found");
            }

            req.user = user as any;
            next();
        } catch (e) {
            clearToken(res);
            res.status(401);
            throw new AuthenticationError("Invalid token");
        }
    }
);

export { authenticate };