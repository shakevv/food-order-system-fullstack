import mongoose, { Document, Schema } from "mongoose";


export interface IProduct extends Document {
    title: string;
    description: string;
    price: number;
    photo: string;
    category: String;
}

export const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
});

export const Product = mongoose.model('products', productSchema);