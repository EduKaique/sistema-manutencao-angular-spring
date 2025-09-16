import { Injectable } from '@angular/core';
import { RequestData } from '../shared/models/request-data';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private STORAGE_KEY = 'orcamento';

  getBudget(): RequestData | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  saveBudget(budget: RequestData) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(budget));
  }

  updateStatus(status: 'APROVADA' | 'REJEITADA') {
    const budget = this.getBudget();
    if (budget) {
      budget.status = status;
      this.saveBudget(budget);
    }
  }
}
