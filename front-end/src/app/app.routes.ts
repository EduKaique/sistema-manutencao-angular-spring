import { Routes } from '@angular/router';
import { LoginPageComponent } from './core/auth/pages/login-page/login-page.component';
import { PaymentPanelComponent } from './features/client/request-detail-page/components/payment-panel/payment-panel.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'payment-page',
    component: PaymentPanelComponent
  }
];
  