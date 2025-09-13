import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestHistoryService } from '../../../../../shared/services/request-history.service';
import { RequestHistory } from '../../../../../shared/models/request-history';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-request-history',
  standalone: true,
  imports: [ CommonModule, DatePipe],
  templateUrl: './request-history.component.html',
  styleUrl: './request-history.component.css'
})
export class RequestHistoryComponent implements OnInit {
  @Input() requestId!: number;
  history: RequestHistory[] = [];

  constructor(private requestHistoryService: RequestHistoryService) { }

  ngOnInit(): void {
    if (this.requestId) {
      const rawHistory = this.requestHistoryService.getHistoryByRequestId(this.requestId);
      this.history = rawHistory.map(entry => ({
        ...entry,
        date: new Date(entry.date)
        }));
    }
  }
}
