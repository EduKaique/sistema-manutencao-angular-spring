import { Injectable } from '@angular/core';
import { RequestHistory } from '../../shared/models/request-history';

const LS_CHAVE = 'requestHistory';

@Injectable({
  providedIn: 'root',
})
export class RequestHistoryService {
  constructor() {}

  getHistoryByRequestId(requestId: number): RequestHistory[] {
    const requestHistory = localStorage.getItem(LS_CHAVE);
    if (!requestHistory) {
      return [];
    }
    const history: RequestHistory[] = JSON.parse(requestHistory);
    return history.filter((h) => h.requestId === requestId);
  }

  addHistory(entry: RequestHistory): void {
    const requestHistory = localStorage.getItem(LS_CHAVE);
    const history: RequestHistory[] = requestHistory
      ? JSON.parse(requestHistory)
      : [];
    entry.id = new Date().getTime();
    history.push(entry);
    localStorage.setItem(LS_CHAVE, JSON.stringify(history));
  }
}
