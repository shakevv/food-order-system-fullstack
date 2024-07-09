import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICart } from '../../types/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartValue$: Observable<ICart> = of({
    items: [],
    totalPrice: 0,
    totalProducts: 0
  });

  cartValue: ICart = {
    items: [],
    totalPrice: 0,
    totalProducts: 0
  }

  get cart(): ICart {
    return this.cart;
  }

  get cart$(): Observable<ICart> {
    return this.cartValue$;
  }
}
