import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ICart } from '../../../types/cart';
import { Observable } from 'rxjs';
import { CartStoreItem } from '../../cart.storeItem';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-status',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.scss'
})
export class CartStatusComponent {
  cart: CartStoreItem = inject(CartStoreItem);
  cartItems$: Observable<ICart> = this.cart.cart$;
}
