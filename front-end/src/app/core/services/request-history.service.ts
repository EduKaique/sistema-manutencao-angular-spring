import { Injectable } from '@angular/core';
import { RequestHistory } from '../../shared/models/request-history';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

const LS_CHAVE = 'requestHistory';

@Injectable({
  providedIn: 'root',
})
export class RequestHistoryService {
  constructor() {}

  private historySubject = new BehaviorSubject<RequestHistory[]>(this.loadFromLocalStorage());

  private loadFromLocalStorage() {
  const requestHistory = localStorage.getItem(LS_CHAVE);
  if (!requestHistory) return [];
  try {
    const arr: RequestHistory[] = JSON.parse(requestHistory);
    return arr.map((entry) => ({
      ...entry,
      date: entry.date ? new Date(entry.date) : new Date(0),
    }));
  } catch {
    return [];
  }
}

  private saveToLocalStorage(history: RequestHistory[]) {
    localStorage.setItem(LS_CHAVE, JSON.stringify(history));
    this.historySubject.next(history);
  }

  getHistoryByRequestId(requestId: number, sortDesc = true): RequestHistory[] {
    const history = this.historySubject.getValue().filter(h => h.requestId === requestId);
    history.sort((a, b) => (sortDesc ? +new Date(b.date) - +new Date(a.date) : +new Date(a.date) - +new Date(b.date)));
    return history;
  }

  getHistoryObsByRequestId(requestId: number) {
    return this.historySubject.asObservable().pipe(
      map(history => history.filter(h => h.requestId === requestId).sort((a, b) => +new Date(b.date) - +new Date(a.date)))
    );
  }

  addHistory(entry: RequestHistory): void {
    const requestHistory = this.loadFromLocalStorage();   
    entry.id = new Date().getTime();
    requestHistory.push(entry); 
    //this.saveToLocalStorage(requestHistory);
  }
}