import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "./Product";


export interface IOrder extends Document {
    name: string;
    lastName: string;
    cart: ICart;
    address: string;
    phoneNumber: string;
    date: string;
    status: string;
}

interface ICartItem {
    product: IProduct;
    quantity: number;
}

interface ICart {
    items: ICartItem[];
    totalPrice: number;
    totalProducts: number;
}

export const orderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            product: {
                _id: {
                    type: String,
                    required: true
                },
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
                }
            },
            quantity: {
                type: Number,
                required: true
            }
        }],
        totalPrice: {
            type: Number,
            required: true
        },
        totalProducts: {
            type: Number,
            required: true
        }
    },
    address: {
        type: String,
        required: true
    },
    additionalInfo: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

export const Order = mongoose.model('orders', orderSchema);