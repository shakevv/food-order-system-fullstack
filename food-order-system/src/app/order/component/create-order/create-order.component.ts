import { Component, Input, inject } from '@angular/core';
import { CartStoreItem } from '../../../cart/cart.storeItem';
import { NavigationComponent } from '../../../navigation/component/navigation/navigation.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { OrderFormComponent } from '../order-form/order-form.component';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [
    NavigationComponent,
    CommonModule,
    AsyncPipe,
    OrderFormComponent,
  ],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss'
})
export class CreateOrderComponent {
  cart: CartStoreItem = inject(CartStoreItem);
  @Input() isOrderSuccessful: boolean = false;
}
