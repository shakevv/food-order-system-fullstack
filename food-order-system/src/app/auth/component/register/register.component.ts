import { Component, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../../../navigation/component/navigation/navigation.component';
import { IAuthData } from '../../../types/auth-data';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NavigationComponent,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  authService = inject(AuthService);
  incorrectCredentials = false;
  router = inject(Router);
  isRegisterFailed = false;
  isRegisterSuccessful = false;
  errorMessage = '';
  @Output() userCreated = new EventEmitter<void>();

  formSubmitHandler() {
    if (this.registerForm.invalid) {
      return;
    }
    const formValue = this.registerForm.value;
    const registerData: IAuthData = { email: formValue.email, password: formValue.password };

    this.authService.register(registerData).subscribe({
      next: () => {
        this.userCreated.emit();
        this.registerForm.reset();
        this.isRegisterSuccessful = true;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isRegisterFailed = true;
      }
    });
  }
}
