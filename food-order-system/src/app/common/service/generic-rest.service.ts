import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Identifiable } from '../../types/identifiable';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericRestService<T extends Identifiable, K> {
  protected readonly apiUrl: string = `${environment.API_URL}`;
  protected readonly http: HttpClient = inject(HttpClient);

  abstract getResourceUrl(): string;

  getAll(params: string = ''): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}${this.getResourceUrl()}${params}`).pipe(
      map((list: any) => list.map((item: any) => this.fromServerModel(item)))
    );
  }

  getById(id: K): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${this.getResourceUrl()}/${id}`).pipe(
      map((json: any) => this.fromServerModel(json))
    );
  }

  post(creationDto: Omit<T, '_id'>): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.getResourceUrl()}`, this.toServerModel(creationDto)).pipe(
    );
  }

  updateById(updateData: T, id: K): Observable<any> {
    return this.http.put(`${this.apiUrl}${this.getResourceUrl()}/${id}`, this.toServerModel(updateData)).pipe(
    );
  }

  deleteById(id: K): Observable<any> {
    return this.http.delete(`${this.apiUrl}${this.getResourceUrl()}/${id}`).pipe(
    );
  }

  fromServerModel(json: any): T {
    return json;
  }

  toServerModel(entity: T | Omit<T, '_id'>): any {
    return entity;
  }
}