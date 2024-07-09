import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartStatusComponent } from '../../../cart/component/cart-status/cart-status.component';
import { AuthService } from '../../../auth/service/auth.service';
import { UserStorageService } from '../../../auth/service/user-storage.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    CartStatusComponent,
    AsyncPipe,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  authService: AuthService = inject(AuthService);
  userStorageService: UserStorageService = inject(UserStorageService);
  router: Router = inject(Router);

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.userStorageService.clean();
        this.router.navigate(['home']);
      },
      error: err => {
        console.log(err);
        this.userStorageService.clean();
        this.router.navigate(['login']);
      }
    });
  }
}
