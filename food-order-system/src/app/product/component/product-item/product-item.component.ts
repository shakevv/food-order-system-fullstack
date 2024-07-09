import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IProduct } from '../../../types/product';
import { CurrencyPipe, NgIf } from '@angular/common';
import { CartStoreItem } from '../../../cart/cart.storeItem';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserStorageService } from '../../../auth/service/user-storage.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    NgIf,
    CurrencyPipe,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product: IProduct | null = null;
  cart: CartStoreItem = inject(CartStoreItem);
  userStorageService: UserStorageService = inject(UserStorageService);
  @Output() deleteProductEvt = new EventEmitter<string>();

  addToCart(product: IProduct): void {
    this.cart.addProduct(product);
  }

  deleteProduct(id: string) {
    this.deleteProductEvt.emit(id);
  }
}
