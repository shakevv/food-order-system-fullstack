import { Injectable } from '@angular/core';
import { GenericRestService } from '../../common/service/generic-rest.service';
import { ICategory } from '../../types/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends GenericRestService<ICategory, string> {
  private readonly RESOURCE = 'categories';

  override getResourceUrl(): string {
    return this.RESOURCE;
  }
}
