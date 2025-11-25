import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../core/layout/header/header.component';
import { InputPrimaryComponent } from '../../../../shared/components/input-primary/input-primary.component';
import { MatIcon } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { StatusService } from '../../../../core/services/status.service';
import { Status } from '../../../../shared/models/status';
import { MaintenanceRequestResponseDTO as Request } from '../../../../shared/models/maintenance-request.models';
import { StatusColumnComponent } from './components/status-column/status-column.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaintenanceRequestService } from '../../../../core/services/maintenance-request.service';

interface GroupedRequests {
  status: Status;
  requests: Request[];
}

@Component({
  selector: 'app-view-requests-page',
  imports: [
    InputPrimaryComponent,
    MatIcon,
    CommonModule,
    StatusColumnComponent,
    MatTableModule,
  ],
  templateUrl: './view-requests-page.component.html',
  styleUrl: './view-requests-page.component.css',
})
export class ViewRequestsPageComponent {
  isKanbanView = true;

  private statusService = inject(StatusService);
  private requestService = inject(MaintenanceRequestService);

  statuses = toSignal(this.statusService.getAll(), { initialValue: [] as Status[] });

  requests = toSignal(this.requestService.getAllEmployeeRequests(), { initialValue: [] as Request[] });

  groupedRequests = computed<GroupedRequests[]>(() => {
  const statuses = this.statuses() ?? [];
  const requests = this.requests() ?? []; // agora requests() é ARRAY

  return statuses.map((status) => ({
    status,
    requests: requests.filter((req: Request) => req.statusName === status.nome),
  }));
});

  dataSource = computed(
    () =>
      new MatTableDataSource<Request>(
        this.groupedRequests().flatMap((g) =>
          g.requests.map((r) => ({
            ...r,
            status: g.status.nome, 
          }))
        )
      )
  );

  displayedColumns: string[] = [
    'Nome do Equipamento',
    'Categoria',
    'Cliente',
    'Data',
    'Status',
  ];

  toggleView() {
    this.isKanbanView = !this.isKanbanView;
  }
}