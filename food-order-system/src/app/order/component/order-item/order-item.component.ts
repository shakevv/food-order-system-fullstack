import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, viewChild } from '@angular/core';
import { IOrder } from '../../../types/order';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatBadgeModule,
    MatButtonModule,
  ],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss'
})
export class OrderItemComponent {
  accordion = viewChild.required(MatAccordion);
  @Input() order!: IOrder;
  @Output() finishOrder = new EventEmitter<string>();
  @Input() index!: number;

  finishOrderHandler(id: string) {
    this.finishOrder.emit(id);
  }
}
