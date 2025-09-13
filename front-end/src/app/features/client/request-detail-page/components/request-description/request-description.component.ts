import { Component, Input } from '@angular/core';
import { Request } from '../../../../../shared/models/request';
import { StatusService } from '../../../../../shared/services/status.service';
import { Status } from '../../../../../shared/models/status';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-request-description',
  imports: [CommonModule],
  templateUrl: './request-description.component.html',
  styleUrl: './request-description.component.css'
})
export class RequestDescriptionComponent {
 
  @Input() request!: Request;

  status?: Status & { textColor: string };

  constructor(private statusService: StatusService) {}

  getStatus(statusId: number): Status | undefined {
    return this.statusService.getById(statusId);
  }

  formatDate(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  }
}
