import { Routes } from '@angular/router';
import { ClientDashboardPageComponent } from '../client/client-dashboard-page/client-dashboard-page.component';
import { RequestDetailPageComponent } from '../client/request-detail-page/request-detail-page.component';
import { ApproveRejectPanelComponent } from '../client/request-detail-page/components/approve-reject-panel/approve-reject-panel.component';
import { PaymentPanelComponent } from './payment-panel/payment-panel.component';

export const clientRoutes: Routes = [
  {
    path: 'dashboard',
    component: ClientDashboardPageComponent,
  },
  {
    path: 'request-detail/:id',
    component: RequestDetailPageComponent,
  },
  {
    path: 'approve-reject-panel',
    component: ApproveRejectPanelComponent,
  },
  {
    path: 'payment',
    component: PaymentPanelComponent,
  },
];
