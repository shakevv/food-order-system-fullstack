import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavigationComponent } from '../../../navigation/component/navigation/navigation.component';
import { UserStorageService } from '../../service/user-storage.service';
import { PasswordUpdateData } from '../../../types/update-password';
import { UserService } from '../../../user/service/user.service';

@Component({
  selector: 'app-password-update',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NavigationComponent,
    RouterLink,
  ],
  templateUrl: './password-update.component.html',
  styleUrl: './password-update.component.scss'
})
export class PasswordUpdateComponent {
  @ViewChild('updateForm') updateForm!: NgForm;
  userStorageService: UserStorageService = inject(UserStorageService);
  userService: UserService = inject(UserService);
  isUpdateFailed = false;
  isUpdateSuccessful = false;
  errorMessage = '';

  formSubmitHandler() {
    if (this.updateForm.invalid || this.updateForm.value.password !== this.updateForm.value.repeatPassword) {
      console.log(this.updateForm)
      return;
    }

    console.log(this.userStorageService.getUser());
    const updateData: PasswordUpdateData = { _id: this.userStorageService.getUser()._id, password: this.updateForm.value.password };

    this.userService.updatePassword(updateData).subscribe({
      next: () => {
        this.isUpdateSuccessful = true;
        this.updateForm.reset();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isUpdateFailed = true;
      }
    });
  }
}
