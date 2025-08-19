import { Routes } from '@angular/router';
import { LoginPageComponent } from './core/auth/pages/login-page/login-page.component';
import { PaymentPanelComponent } from './features/client/request-detail-page/components/payment-panel/payment-panel.component';
import { BudgetDeliveryComponent } from './features/employee/budget-delivery/budget-delivery.component';
import { ApproveRejectPanelComponent } from './features/client/request-detail-page/components/approve-reject-panel/approve-reject-panel.component';

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
    path: 'budget-delivery',
    component: BudgetDeliveryComponent 
  },
  {
    path: 'payment-page',
    component: PaymentPanelComponent
  },
    {
    path:'approve-reject-panel',
    component:ApproveRejectPanelComponent
  }
];
  