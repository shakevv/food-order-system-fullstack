import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericRestService } from '../../common/service/generic-rest.service';
import { IOrder } from '../../types/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends GenericRestService<IOrder, string> {
  private readonly RESOURCE = 'orders';

  override getResourceUrl(): string {
    return this.RESOURCE;
  }

  finishOrder(id: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}${this.getResourceUrl()}/${id}`, {});
  }
}
