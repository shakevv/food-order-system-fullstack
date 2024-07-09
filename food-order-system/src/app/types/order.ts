import { ICart } from "./cart";
import { Identifiable } from "./identifiable";

export interface IOrder extends Identifiable {
    name: string;
    lastName: string;
    cart: ICart;
    address: string;
    additionalInfo?: string;
    phoneNumber: string;
    date: string;
    status: string;
}