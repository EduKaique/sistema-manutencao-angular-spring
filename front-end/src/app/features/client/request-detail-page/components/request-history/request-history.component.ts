import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs'; // Adicionado Observable e of
import { map, catchError } from 'rxjs/operators'; // Adicionado operadores
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
  standalone: true, // Garanti que é standalone
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
    private employeeService: EmployeService
  ) {}

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


  getUser(userId: number): Observable<string> {
    return this.employeeService.getEmployeeById(userId).pipe(
      map(employee => employee.name),
      catchError(() => of('Usuário desconhecido'))
    );
  }

  getDescription(entry: RequestHistoryView): Observable<string> {
    const title = entry.title.toLowerCase();

    if (title.includes('criada')) return of('Solicitação aberta');
    if (title.includes('aprovada')) return of('Orçamento aprovado');
    if (title.includes('troca')) return of('Troca de responsável');
    
    if (title.includes('orçamento realizado')) {
       return this.getUser(entry.userId).pipe(
         map(userName => `Orçamento realizado por ${userName}`)
       );
    }

    return of(entry.title);
  }

  ngOnDestroy(): void {
    this.historySubscription?.unsubscribe();
  }
}