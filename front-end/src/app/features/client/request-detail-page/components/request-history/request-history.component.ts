import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RequestHistoryService } from '../../../../../core/services/request-history.service';
import { RequestHistory } from '../../../../../shared/models/request-history';
import { StatusService } from '../../../../../core/services/status.service';
import { Status } from '../../../../../shared/models/status';
import { DatePipe } from '@angular/common';
import { EmployeService } from '../../../../employee/services/employe.service';

type RequestHistoryView = RequestHistory & { status?: Status };

@Component({
  selector: 'app-request-history',
  imports: [CommonModule, DatePipe],
  templateUrl: './request-history.component.html',
  styleUrl: './request-history.component.css',
})

export class RequestHistoryComponent implements OnDestroy {
  private _requestId!: number;
  @Input() set requestId(value: number) {
    this._requestId = value;
    this.subscribeHistory();
  }

  get requestId() {
    return this._requestId;
  }

  private historySubscription?: Subscription;
  history: RequestHistoryView[] = [];

  constructor(
    private requestHistoryService: RequestHistoryService, 
    private statusService: StatusService, 
    private employeeService: EmployeService) {}

  private subscribeHistory() {
    if (this.historySubscription) {
      this.historySubscription.unsubscribe();
      this.historySubscription = undefined;
    }
    if (!this.requestId) return;    
    this.historySubscription = this.requestHistoryService.getHistoryObsByRequestId(this.requestId).subscribe((history) => {
      this.history = history.map((entry) => ({
        ...entry,
        date: new Date(entry.date),
        status: this.statusService.getById(entry.statusId),
      }));
    });
  }

  getUser(userId: number): string {
    const employee = this.employeeService.getEmployeeById(userId);
    return employee ? employee.name : 'Usuário desconhecido';
  }

  getDescription(entry: RequestHistoryView): string {
  const user = this.getUser(entry.userId);
  const title = entry.title.toLowerCase();

  if (title.includes('criada')) return 'Solicitação aberta';
  if (title.includes('orçamento realizado')) return `Orçamento realizado por ${user}`;
  if (title.includes('aprovada')) return 'Orçamento aprovado';
  if (title.includes('troca')) return 'Troca de responsável';
  return entry.title;
}

    ngOnDestroy(): void {
      this.historySubscription?.unsubscribe();
    }
  }
