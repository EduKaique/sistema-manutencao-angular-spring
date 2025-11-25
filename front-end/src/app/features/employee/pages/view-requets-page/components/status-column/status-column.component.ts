import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceRequestResponseDTO as Request } from '../../../../../../shared/models/maintenance-request.models';
import { RequestCardComponent } from '../request-card/request-card.component';
import { StatusService } from '../../../../../../core/services/status.service';
import { Status } from '../../../../../../shared/models/status';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-status-column',
  standalone: true,
  imports: [CommonModule, RequestCardComponent],
  templateUrl: './status-column.component.html',
  styleUrls: ['./status-column.component.css'],
})
export class StatusColumnComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) requests: Request[] = [];

  private statusService = inject(StatusService);

  statuses = toSignal(this.statusService.getAll(), { initialValue: [] });

  private readonly fallbackHeaderColor = '#e0e0e0';

  get headerColor(): string {
    const status = this.statuses().find(
      (s) => s.nome?.toUpperCase() === this.title?.toUpperCase()
    );
    return status?.cor ?? this.fallbackHeaderColor;
  }
}