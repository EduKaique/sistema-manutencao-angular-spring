import { Component, computed, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { RequestCardComponent } from '../view-requets-page/components/request-card/request-card.component';
import { Request as RequestModel } from '../../../../shared/models/request';
import { StatusService } from '../../../../core/services/status.service';
import { Status } from '../../../../shared/models/status';
import { RequestService } from '../../../../core/services/request.service';
import { MatIconModule } from '@angular/material/icon';

interface GroupedRequests {
  status: Status;
  requests: RequestModel[];
}
@Component({
  selector: 'app-employee-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    RequestCardComponent,
    MatIconModule,
  ],
  templateUrl: './employee-dashboard-page.component.html',
  styleUrl: './employee-dashboard-page.component.css',
})
export class EmployeeDashboardPageComponent {
  private statusService = inject(StatusService);
  private requestService = inject(RequestService);

  statuses = this.statusService.getAll();
  requests = this.requestService.listarTodos();

  groupedRequests = computed<GroupedRequests[]>(() => {
    const statuses = this.statuses;
    const requests = this.requests;

    return statuses.map((status) => ({
      status: status,
      requests: requests.filter((req) => req.statusId === status.id),
    }));
  });

  openRequests = 4;
  overdueRequests = 1;
  noResponsible = 2;
  createdToday = 3;

  // requests = [
  //   {
  //     title: 'Notebook Dell Inspiron 15',
  //     openedAgo: '28 horas',
  //     category: 'Notebook',
  //     client: 'Nilson Nativus',
  //     status: '',
  //   },
  //   {
  //     title: 'Troca de tela do celular',
  //     openedAgo: '2 horas',
  //     category: 'Celular',
  //     client: 'Renata Montano',
  //     status: '',
  //   },
  //   {
  //     title: 'Formatação e backup',
  //     openedAgo: '6 minutos',
  //     category: 'Sistema Operacional',
  //     client: 'Floury Nations',
  //     status: 'Sem Responsável',
  //   },
  //   {
  //     title: 'Teclado Mecânico',
  //     openedAgo: '4 minutos',
  //     category: 'Equipamento',
  //     client: 'Razet Montano',
  //     status: 'Sem Responsável',
  //   },
  // ];

  makeQuote(request: any) {
    console.log('Efetuando orçamento para:', request.title);
    // Aqui você pode abrir um modal ou navegar para outra página
  }
}
