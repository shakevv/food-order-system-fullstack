import mongoose from "mongoose"
import dotenv from 'dotenv';


dotenv.config();

const DB_URL = process.env.MONGODB_URL;

if (DB_URL) {
    mongoose.connect(DB_URL)
        .catch(err => {
            console.log('MONGODB connection failed...', err);
            throw err;
        });
}