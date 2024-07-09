import { Component, OnInit, inject } from '@angular/core';
import { IProduct } from '../../../types/product';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { ProductItemComponent } from '../product-item/product-item.component';
import { NavigationComponent } from '../../../navigation/component/navigation/navigation.component';
import { ListCategoriesComponent } from '../../../category/component/list-categories/list-categories.component';
import { ICategory } from '../../../types/category';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { UserStorageService } from '../../../auth/service/user-storage.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    ProductItemComponent,
    NavigationComponent,
    ListCategoriesComponent,
    MatIconModule,
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent {
  productService = inject(ProductService);
  products$: Observable<IProduct[]> = this.productService.getAll();
  readonly dialog = inject(MatDialog);
  userStorageService: UserStorageService = inject(UserStorageService);
  currentCategory: ICategory | null = null;

  getByCategoryHandler(category: ICategory) {
    this.currentCategory = category;
    if (category.category !== 'all') {
      this.products$ = this.productService.getAll(`?category=${category.category}`);
      return;
    }
    this.products$ = this.productService.getAll();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductFormComponent);

    dialogRef.afterClosed().subscribe(observer => {
      this.productCreatedHandler();
    });
  }

  deleteHandler(id: string) {
    this.productService.deleteById(id).subscribe({
      next: () => {
        if (this.currentCategory !== null) {
          this.getByCategoryHandler(this.currentCategory)
        } else {
          this.products$ = this.productService.getAll();
        }
      }
    });
  }

  productCreatedHandler() {
    if (this.currentCategory !== null) {
      this.getByCategoryHandler(this.currentCategory)
    } else {
      this.products$ = this.productService.getAll();
    }
  }

  identify(index: number, item: IProduct) {
    return item._id;
  }
}


