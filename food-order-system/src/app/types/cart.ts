import { ICartItem } from "./cart-item";

export interface ICart {
    items: ICartItem[];
    totalPrice: number;
    totalProducts: number;
}