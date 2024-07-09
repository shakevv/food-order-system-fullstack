import mongoose, { Document, Schema } from "mongoose";


export interface ICategory extends Document {
    category: string;
}

export const productSchema = new Schema({
    category: {
        type: String,
        required: true
    },
});

export const Category = mongoose.model('categories', productSchema);