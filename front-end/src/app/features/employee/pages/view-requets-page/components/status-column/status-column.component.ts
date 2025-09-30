import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Request } from '../../../../../../shared/models/request';
import { RequestCardComponent } from '../request-card/request-card.component';
import { StatusService } from '../../../../../../core/services/status.service';
import { Status } from '../../../../../../shared/models/status';

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

  constructor(private statusService: StatusService) {}

  status: Status | undefined;

  private readonly fallbackHeaderColor = '#e0e0e0';

  get headerColor(): string {
    const status = this.statusService
      .getAll()
      .find((s) => s.nome?.toUpperCase() === this.title?.toUpperCase());
    return status?.cor ?? this.fallbackHeaderColor;
  }
}
