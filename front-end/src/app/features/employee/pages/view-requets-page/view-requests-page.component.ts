import { Component, inject, computed, ViewChild, effect } from '@angular/core';
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
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';

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
    MatSortModule,
  ],
  templateUrl: './view-requests-page.component.html',
  styleUrl: './view-requests-page.component.css',
})
export class ViewRequestsPageComponent {
  isKanbanView = true;

  @ViewChild(MatSort) sort!: MatSort;

  private statusService = inject(StatusService);
  private requestService = inject(MaintenanceRequestService);

  statuses = toSignal(this.statusService.getAll(), { initialValue: [] as Status[] });
  requests = toSignal(this.requestService.getAllEmployeeRequests(), { initialValue: [] as Request[] });

  groupedRequests = computed(() => {
    const statuses = this.statuses();
    const reqs = this.requests();

    return statuses.map((status) => ({
      status,
      requests: reqs.filter((r) => r.statusName === status.nome)
    }));
  });

  dataSource = new MatTableDataSource<Request>();

  constructor() {
    effect(() => {
      const rows = this.groupedRequests().flatMap((g) =>
        g.requests.map((r) => ({
          ...r,
          status: g.status.nome,
        }))
      );

      this.dataSource.data = rows;
    });
  }

  displayedColumns: string[] = [
    'equipmentName',
    'categoryName',
    'clientName',
    'requestDate',
    'status'
  ];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: any, property) => {
      switch (property) {
        case 'requestDate': return new Date(item.requestDate); // Garante ordenação cronológica
        default: return item[property];
      }
    };
  }

  toggleView() {
    this.isKanbanView = !this.isKanbanView;
  }
}
