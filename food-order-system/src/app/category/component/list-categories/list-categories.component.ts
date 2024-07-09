import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CategoryService } from '../../services/category-service';
import { ICategory } from '../../../types/category';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserStorageService } from '../../../auth/service/user-storage.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-categories',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    MatIconModule,
  ],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.scss'
})
export class ListCategoriesComponent {
  categoryService = inject(CategoryService);
  categories$ = this.categoryService.getAll();
  activeCategory: string = 'all';
  @Output() getProductsByCategory = new EventEmitter<ICategory>();
  userStorageService: UserStorageService = inject(UserStorageService);
  readonly dialog = inject(MatDialog);
  router: Router = inject(Router);

  getProductsFromCategory(category: ICategory) {
    this.activeCategory = category.category;
    console.log('active category: ', this.activeCategory);
    this.getProductsByCategory.emit(category);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CategoryFormComponent);

    dialogRef.afterClosed().subscribe({
      next: () => {
        this.categories$ = this.categoryService.getAll();
      },
      error: (err) => {
        alert('Error while adding category');
      }
    });
  }

  deleteCategory(id: string) {
    this.categoryService.deleteById(id).subscribe({
      next: () => {
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigateByUrl('/home#menu');
        });
      }
    });
  }

  identify(index: number, item: ICategory) {
    return item._id;
  }
}