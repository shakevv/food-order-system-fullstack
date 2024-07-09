import { Injectable } from '@angular/core';
import { GenericRestService } from '../../common/service/generic-rest.service';
import { IProduct } from '../../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends GenericRestService<IProduct, string> {
  private readonly RESOURCE = 'products';

  override getResourceUrl(): string {
    return this.RESOURCE;
  }
}
