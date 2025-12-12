import { Component, computed, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { RequestCardComponent } from '../view-requets-page/components/request-card/request-card.component';
import { MaintenanceRequestResponseDTO as Request } from '../../../../shared/models/maintenance-request.models';
import { StatusService } from '../../../../core/services/status.service';
import { Status } from '../../../../shared/models/status';
import { MaintenanceRequestService } from '../../../../core/services/maintenance-request.service';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';

interface GroupedRequests {
  status: Status;
  requests: Request[];
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
  private requestService = inject(MaintenanceRequestService);

  statuses = toSignal(this.statusService.getAll(), { initialValue: [] });
  requests = toSignal(this.requestService.getAllEmployeeRequests(), { initialValue: [] });

  groupedRequests = computed<GroupedRequests[]>(() => {
    const statuses = this.statuses();   
    const requests = this.requests();   

    return statuses.map(status => ({
      status,
      requests: requests.filter(req => req.statusName === status.nome),
    }));
  });

  
  overdueRequests = 0;
  noResponsible = 0;
  createdToday = 0;

  makeQuote(request: any) {
  
  }
  getOpenRequestCount(): number {
    const requests = this.requests;
    return requests().filter(req => req.statusName === 'ABERTA').length;
  }
}
