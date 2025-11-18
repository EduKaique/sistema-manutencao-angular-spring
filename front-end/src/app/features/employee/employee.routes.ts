import { Routes } from '@angular/router';
import { EmployeeDashboardPageComponent } from './pages/employee-dashboard-page/employee-dashboard-page.component';
import { BudgetDeliveryComponent } from './pages/budget-delivery/budget-delivery.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { ManageCategoriesPageComponent } from './pages/manage-categories-page/manage-categories-page.component';
import { ViewRequestsPageComponent } from './pages/view-requets-page/view-requests-page.component';
import { ReportsPageComponent } from './pages/reports-page/reports-page.component';

export const employeeRoutes: Routes = [
  {
    //Exibe o Dashboard com estatísticas do funcionário
    path: 'dashboard',
    component: EmployeeDashboardPageComponent,
  },
  {
    //Tela de entrega de orçamento
    path: 'budget-delivery/:id',
    component: BudgetDeliveryComponent,
  },
  {
    //Lista todos os funcionários (Tabela com CRUD)
    path: 'employees-list',
    component: EmployeeListComponent,
  },
  {
    // Rota operacional: Visualização das solicitações de manutenção recebidas
    path: 'view-requests',
    component: ViewRequestsPageComponent,
  },
  {
    //Gerenciamento de categorias
    path: 'categories',
    component: ManageCategoriesPageComponent,
  },
  {
    //Tela de relatórios e métricas do sistema
    path: 'reports',
    component: ReportsPageComponent,
  },
];