import { Routes } from '@angular/router';
import { EmployeeDashboardPageComponent } from './pages/employee-dashboard-page/employee-dashboard-page.component';
import { BudgetDeliveryComponent } from './pages/budget-delivery/budget-delivery.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { ManageCategoriesPageComponent } from './pages/manage-categories-page/manage-categories-page.component';
import { ViewRequestsPageComponent } from './pages/view-requets-page/view-requests-page.component';
import { ReportsPageComponent } from './pages/reports-page/reports-page.component';

export const employeeRoutes: Routes = [
  {
    path: 'dashboard',
    component: EmployeeDashboardPageComponent,
  },
  {
    path: 'budget-delivery/:id',
    component: BudgetDeliveryComponent,
  },
  {
    path: 'employees-list',
    component: EmployeeListComponent,
  },
  {
    path: 'view-requests',
    component: ViewRequestsPageComponent,
  },
  {
    path: 'categories',
    component: ManageCategoriesPageComponent,
  },
  {
    path: 'reports',
    component: ReportsPageComponent,
  },
];
