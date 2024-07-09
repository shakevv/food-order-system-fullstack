import express from 'express';
import userRouter from './router/userRoutes';
import productRouter from './router/productRoutes';
import orderRouter from './router/orderRoutes';
import categoryRouter from './router/categoryRouter';
import './db/db';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorMiddleware";
import authRouter from './router/authRouter';
import helmet from 'helmet';
import dotenv from 'dotenv';


dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true,
}));

app.use(cookieParser());


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.use('/auth', authRouter)
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);
app.use(errorHandler);

interface UserBasicInfo {
    _id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserBasicInfo | null;
        }
    }
}