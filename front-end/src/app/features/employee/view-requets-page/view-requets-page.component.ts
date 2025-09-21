import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { HeaderComponent } from '../../../core/layout/header/header.component';
import { InputPrimaryComponent } from '../../../shared/components/input-primary/input-primary.component';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { RequestService } from '../../../shared/services/request.service';
import { StatusService } from '../../../shared/services/status.service';
import { Status } from '../../../shared/models/status';
import { Request as RequestModel } from '../../../shared/models/request';
import { StatusColumnComponent } from './components/status-column/status-column.component';

interface GroupedRequests {
  status: Status;
  requests: RequestModel[];
}


@Component({
  selector: 'app-view-requests-page',
  imports: [HeaderComponent, InputPrimaryComponent, MatIcon, CommonModule, StatusColumnComponent],
  templateUrl: './view-requets-page.component.html',
  styleUrl: './view-requets-page.component.css'
})
export class ViewRequetsPageComponent {

  isKanbanView: boolean = true;
  private statusService = inject(StatusService);
  private requestService = inject(RequestService);

  private statuses = this.statusService.getAll();
  private requests = this.requestService.listarTodos();

  groupedRequests = computed<GroupedRequests[]>(() => {
  const statuses = this.statuses;
  const requests = this.requests;

    return statuses.map(status => ({
      status: status,
      requests: requests.filter(req => req.statusId === status.id)
    }));
  });



  toggleView() {
    this.isKanbanView = !this.isKanbanView;
  }

}
