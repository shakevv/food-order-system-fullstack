import { Identifiable } from "./identifiable";
import { ProductCategory } from "./product-category";

export interface IProduct extends Identifiable {
    title: string;
    description: string;
    price: number;
    photo: string;
    category: ProductCategory;
}


export { ProductCategory };