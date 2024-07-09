import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../../../types/user';
import { Observable } from 'rxjs';
import { NavigationComponent } from '../../../navigation/component/navigation/navigation.component';
import { UserStorageService } from '../../service/user-storage.service';
import { IAuthData } from '../../../types/auth-data';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NavigationComponent,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  authService = inject(AuthService);
  userStorageService = inject(UserStorageService);
  principal$: Observable<IUser> | null = null;
  router = inject(Router);
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  formSubmitHandler() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData: IAuthData = this.loginForm.value;

    this.authService.login(loginData).subscribe({
      next: data => {
        this.userStorageService.saveUser(data);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.router.navigate(['home']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
}
