import { Component } from '@angular/core';
import { ListProductsComponent } from "../../../product/component/list-products/list-products.component";
import { NavigationComponent } from '../../../navigation/component/navigation/navigation.component';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  imports: [
    ListProductsComponent,
    NavigationComponent,
    CommonModule,
    AsyncPipe,
  ]
})
export class LandingPAgeComponent {
}
