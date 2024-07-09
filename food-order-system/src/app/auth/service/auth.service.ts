import { Injectable, inject } from '@angular/core';
import { IUser } from '../../types/user';
import { IAuthData } from '../../types/auth-data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl: string = `${environment.API_URL}`;
  private http: HttpClient = inject(HttpClient);

  register(registerFormData: IAuthData): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}auth/register`, registerFormData);
  }

  login(loginData: IAuthData): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}auth/login`, loginData);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/logout`, {})
  }
}