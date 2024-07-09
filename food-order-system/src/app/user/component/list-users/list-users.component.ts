import { Component, inject } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Observable } from 'rxjs';
import { IUser } from '../../../types/user';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NavigationComponent } from '../../../navigation/component/navigation/navigation.component';
import { RegisterComponent } from '../../../auth/component/register/register.component';
import { PasswordUpdateComponent } from '../../../auth/component/password-update/password-update.component';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [
    MatListModule,
    MatDividerModule,
    CommonModule,
    AsyncPipe,
    NavigationComponent,
    RegisterComponent,
    PasswordUpdateComponent,
  ],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {
  userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.getAll();

  identify(index: number, item: IUser) {
    return item._id;
  }

  userCreatedHandler() {
    this.users$ = this.userService.getAll();
  }

  removeUserHandler(id: string) {
    this.userService.deleteById(id).subscribe({
      next: () => {
        this.users$ = this.userService.getAll();
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
