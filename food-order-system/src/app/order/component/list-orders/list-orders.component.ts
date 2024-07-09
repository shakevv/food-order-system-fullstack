import { Component, inject, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { IOrder } from '../../../types/order';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { NavigationComponent } from '../../../navigation/component/navigation/navigation.component';
import { Router } from '@angular/router';
import { OrderItemComponent } from '../order-item/order-item.component';
import { MatAccordion } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-list-orders',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    NavigationComponent,
    OrderItemComponent,
    MatAccordion,
    MatButtonModule,
  ],
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.scss'
})
export class ListOrdersComponent {
  accordion = viewChild.required(MatAccordion);
  orderService: OrderService = inject(OrderService);
  orders$: Observable<IOrder[]> = this.orderService.getAll();
  router: Router = inject(Router);
  isOrderStatusUpdated: boolean = false;

  finishORderHandler(id: string) {
    this.orderService.finishOrder(id).subscribe(() => {
      this.isOrderStatusUpdated = true;
      this.orders$ = this.orderService.getAll();
    });
  }

  identify(index: number, item: IOrder) {
    return item._id;
  }
}
