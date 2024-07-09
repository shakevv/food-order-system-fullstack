import { Observable } from "rxjs";
import { StoreItem } from "../common/state-management/store-item";
import { ICart } from "../types/cart";
import { ICartItem } from "../types/cart-item";
import { IProduct } from "../types/product";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CartStoreItem extends StoreItem<ICart> {
    constructor() {
        const storedCart: any = sessionStorage.getItem('cart');
        if (storedCart) {
            super(JSON.parse(storedCart));
        } else {
            super(
                {
                    items: [],
                    totalPrice: 0,
                    totalProducts: 0,
                });
        }
    }

    get cart$(): Observable<ICart> {
        return this.value$;
    }

    get cart(): ICart {
        return this.value;
    }

    addProduct(product: IProduct): void {
        const cartProduct: ICartItem | undefined = this.cart.items.find(
            (cartProduct) => cartProduct.product._id === product._id
        );

        if (!cartProduct) {
            this.cart.items = [
                ...this.cart.items,
                {
                    product: product,
                    quantity: 1,
                }
            ];
        } else {
            cartProduct.quantity++;
        }
        this.cart.totalPrice += Number(product.price);
        this.cart.totalProducts++;
        this.saveCart();
    }

    removeProduct(product: IProduct): void {
        const cartProduct: ICartItem | undefined = this.cart.items.find(
            (cartProduct) => cartProduct.product._id === product._id
        );

        if (!cartProduct) {
            return;
        }

        cartProduct.quantity--;
        if (cartProduct.quantity === 0) {
            this.cart.items = this.cart.items.filter((item) => item !== cartProduct);
        }

        this.cart.totalPrice -= Number(product.price);
        this.cart.totalProducts--;
        if (this.cart.items.length === 0) {
            sessionStorage.clear();
        } else {
            this.saveCart();
        }
    }

    saveCart(): void {
        sessionStorage.removeItem('cart');
        sessionStorage.setItem('cart', JSON.stringify(this.cart));
    }

    reset() {
        this.setValue({
            items: [],
            totalPrice: 0,
            totalProducts: 0,
        });
        this.saveCart();
    }
}