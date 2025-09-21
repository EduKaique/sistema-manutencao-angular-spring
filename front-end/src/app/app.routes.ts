import { Routes } from '@angular/router';
import { LoginPageComponent } from './core/auth/pages/login-page/login-page.component';
import { PaymentPanelComponent } from './features/client/request-detail-page/components/payment-panel/payment-panel.component';
import { BudgetDeliveryComponent } from './features/employee/budget-delivery/budget-delivery.component';
import { ApproveRejectPanelComponent } from './features/client/request-detail-page/components/approve-reject-panel/approve-reject-panel.component';
import { RequestDetailPageComponent } from './features/client/request-detail-page/request-detail-page.component';
import { SignupPageComponent } from './core/auth/pages/signup-page/signup-page.component';
import { ClientDashboardPageComponent } from './features/client/client-dashboard-page/client-dashboard-page.component';
import { EmployeeListComponent } from './features/employee/components/employee-list/employee-list.component';
import { EmployeeDashboardPageComponent } from './features/employee/employee-dashboard-page/employee-dashboard-page.component';
import { ManageCategoriesPageComponent } from './features/employee/admin/manage-categories-page/manage-categories-page.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { RoleGuard } from './core/auth/guards/role.guard';
import { UnauthorizedPageComponent } from './core/layout/unauthorized-page/unauthorized-page.component';
import { PageNotFoundComponent } from './core/layout/page-not-found/page-not-found.component';
import { ViewRequestsPageComponent } from './features/employee/view-requets-page/view-requests-page.component';

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
    path: 'signup',
    component: SignupPageComponent,
  },
  {
    path: 'error-unauthorized',
    component: UnauthorizedPageComponent,
  },
  {
    path: 'client-dashboard',
    component: ClientDashboardPageComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'client' },
  },
  {
    path: 'request-detail/:id',
    component: RequestDetailPageComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'client' },
  },
  {
    path: 'approve-reject-panel',
    component: ApproveRejectPanelComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'client' },
  },
  {
    path: 'payment-page',
    component: PaymentPanelComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'client' },
  },
  {
    path: 'employee-dashboard',
    component: EmployeeDashboardPageComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'employee' },
  },
  {
    path: 'budget-delivery',
    component: BudgetDeliveryComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'employee' },
  },
  {
    path: 'employee-list',
    component: EmployeeListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'employee' },
  },
  {
    path: 'view-requests',
    component: ViewRequestsPageComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'employee' },
  },
  {
    path: 'manage-categories-page',
    component: ManageCategoriesPageComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'employee' },
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
