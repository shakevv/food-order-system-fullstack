import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CartStoreItem } from '../../../cart/cart.storeItem';
import { IOrder } from '../../../types/order';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {
  @Output() orderCreated = new EventEmitter<void>()
  cart: CartStoreItem = inject(CartStoreItem);
  orderService: OrderService = inject(OrderService);
  orderForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      additionalInfo: new FormControl(''),
    }
  );
  errorMessage: string = '';
  isSubmitUnsuccessful: boolean = false;
  isFormSubmitted: boolean = false;

  submitForm() {
    this.isFormSubmitted = true;
    const formValue = {
      name: this.orderForm.value.firstName,
      lastName: this.orderForm.value.lastName,
      cart: this.cart.cart,
      address: this.orderForm.value.address,
      additionalInfo: this.orderForm.value.additionalInfo,
      phoneNumber: this.orderForm.value.phoneNumber,
      date: new Date().toLocaleString(),
      status: "New",
    } as any as Omit<IOrder, 'id'>;

    this.orderService.post(formValue).subscribe({
      next: () => {
        this.orderCreated.emit();
        this.orderForm.reset();
        this.cart.reset();
        this.isFormSubmitted = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSubmitUnsuccessful = true;
      }
    });
  }
}
