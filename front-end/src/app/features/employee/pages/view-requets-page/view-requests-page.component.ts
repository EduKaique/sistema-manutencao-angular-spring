import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../core/layout/header/header.component';
import { InputPrimaryComponent } from '../../../../shared/components/input-primary/input-primary.component';
import { MatIcon } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { RequestService } from '../../../../core/services/request.service';
import { StatusService } from '../../../../core/services/status.service';
import { Status } from '../../../../shared/models/status';
import { Request as RequestModel } from '../../../../shared/models/request';
import { StatusColumnComponent } from './components/status-column/status-column.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

interface GroupedRequests {
  status: Status;
  requests: RequestModel[];
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
  private requestService = inject(RequestService);

  statuses = toSignal(this.statusService.getAll(), { initialValue: [] as Status[] });

  requests = this.requestService.listarTodos();

  groupedRequests = computed<GroupedRequests[]>(() => {
    const statuses = this.statuses() ?? [];
    const requests = this.requests ?? [];

    return statuses.map((status) => ({
      status,
      requests: requests.filter((req) => req.statusId === status.id),
    }));
  });

  dataSource = computed(
    () =>
      new MatTableDataSource<RequestModel>(
        this.groupedRequests().flatMap((g) =>
          g.requests.map((r) => ({
            ...r,
            status: g.status.name, 
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
