import { Routes } from '@angular/router';
import { LoginComponent } from './auth/component/login/login.component';
import { NotFoundComponent } from './common/component/not-found/not-found.component';
import { LandingPAgeComponent } from './landing-page/component/landing-page/landing-page.component';
import { CartDetailsComponent } from './cart/component/cart-details/cart-details.component';
import { CreateOrderComponent } from './order/component/create-order/create-order.component';
import { ListOrdersComponent } from './order/component/list-orders/list-orders.component';
import { authGuard } from './auth/guard/auth.guard';
import { ListUsersComponent } from './user/component/list-users/list-users.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: LandingPAgeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'cart',
        component: CartDetailsComponent,
    },
    {
        path: 'create-order',
        component: CreateOrderComponent,
    },
    {
        path: 'orders',
        component: ListOrdersComponent,
        canActivate: [authGuard],
    },
    {
        path: 'manage-users',
        component: ListUsersComponent,
        canActivate: [authGuard],
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];
