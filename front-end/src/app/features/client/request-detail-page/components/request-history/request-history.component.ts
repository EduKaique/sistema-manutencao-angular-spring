import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Observable, of } from 'rxjs';

// Ajuste os imports dos models conforme seu projeto
import { RequestHistory } from '../../../../../shared/models/request-history';

@Component({
  selector: 'app-request-history',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './request-history.component.html',
  styleUrl: './request-history.component.css',
})
export class RequestHistoryComponent {
  
  private _history: RequestHistory[] = [];

  get history(): RequestHistory[] {
    return this._history;
  }

  @Input({ required: true })
  set history(value: RequestHistory[]) {
    if (value) {
      this._history = [...value].sort((a, b) => {
        const dateA = new Date(a.occurrenceDate).getTime();
        const dateB = new Date(b.occurrenceDate).getTime();
        return dateB - dateA;
      });
    } else {
      this._history = [];
    }
  }

  constructor() {}

  
  getDescription(entry: RequestHistory): Observable<string> {
    const title = entry.title ? entry.title.toLowerCase() : '';

    if (title.includes('criada')) return of('Solicitação aberta');
    if (title.includes('aprovada')) return of('Orçamento aprovado');
    if (title.includes('troca')) return of('Troca de responsável');
    
    return of(entry.title);
  }
}