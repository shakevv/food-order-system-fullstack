import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../services/category-service';
import { ICategory } from '../../../types/category';

@Component({
  selector: 'app-category-form',
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
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  categoryService: CategoryService = inject(CategoryService);

  categoryForm = new FormGroup(
    {
      category: new FormControl('', [Validators.required]),
    }
  );
  errorMessage: string = '';
  isSubmitUnsuccessful: boolean = false;
  isFormSubmitted: boolean = false;

  submitForm() {
    this.isFormSubmitted = true;
    const formValue = {
      category: this.categoryForm.value.category,
    } as any as Omit<ICategory, '_id'>;

    this.categoryService.post(formValue).subscribe({
      next: () => {
        this.categoryForm.reset();
        this.isSubmitUnsuccessful = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSubmitUnsuccessful = true;
      }
    });
  }
}
