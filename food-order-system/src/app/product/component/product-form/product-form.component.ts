import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryService } from '../../../category/services/category-service';
import { ICategory } from '../../../types/category';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../../types/product';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  productService: ProductService = inject(ProductService);
  categoryService: CategoryService = inject(CategoryService);
  categories$: Observable<ICategory[]> = this.categoryService.getAll();
  @Output() productCreated = new EventEmitter<void>();
  productForm = new FormGroup(
    {
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      photo: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    }
  );
  errorMessage: string = '';
  isSubmitUnsuccessful: boolean = false;
  isFormSubmitted: boolean = false;

  submitForm() {
    this.isFormSubmitted = true;
    const formValue = {
      title: this.productForm.value.title,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      photo: this.productForm.value.photo,
      category: this.productForm.value.category,
    } as any as Omit<IProduct, '_id'>;

    this.productService.post(formValue).subscribe({
      next: () => {
        this.productForm.reset();
        this.isSubmitUnsuccessful = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSubmitUnsuccessful = true;
      }
    });

    this.productForm.reset();
  }
}
