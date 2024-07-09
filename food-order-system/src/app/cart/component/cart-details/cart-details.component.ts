import { Component, inject } from '@angular/core';
import { NavigationComponent } from '../../../navigation/component/navigation/navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { CartStoreItem } from '../../cart.storeItem';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ICart } from '../../../types/cart';
import { IProduct } from '../../../types/product';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [
    NavigationComponent,
    MatIconModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.scss'
})
export class CartDetailsComponent {
  cartStore: CartStoreItem = inject(CartStoreItem);
  cart$: Observable<ICart> = this.cartStore.cart$;

  removeProduct(removedProduct: IProduct) {
    this.cartStore.removeProduct(removedProduct);
  }
}
