import { Routes } from "@angular/router";
import { EmployeeDashboardPageComponent } from "./employee-dashboard-page/employee-dashboard-page.component";
import { BudgetDeliveryComponent } from "./budget-delivery/budget-delivery.component";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { ManageCategoriesPageComponent } from "./admin/manage-categories-page/manage-categories-page.component";
import { ViewRequestsPageComponent } from "./view-requets-page/view-requests-page.component";
import { ReportsPageComponent } from "./reports-page/reports-page.component";

export const employeeRoutes: Routes = [
    {
    path: 'dashboard',
    component: EmployeeDashboardPageComponent,
  },
  {
    path: 'budget-delivery',
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