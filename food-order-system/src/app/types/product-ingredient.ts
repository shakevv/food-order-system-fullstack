import { Identifiable } from "./identifiable";

export interface IProductIngredient extends Identifiable {
    title: string;
    price: number;
    photo: string;
}