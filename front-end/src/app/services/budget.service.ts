import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RequestData } from '../shared/models/request-data';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private STORAGE_KEY = 'orcamentos';
  private budgetSubjects = new Map<number, BehaviorSubject<RequestData | null>>();

  getBudget(requestId: number): RequestData | null {
    const data = localStorage.getItem(this.getStorageKey(requestId));
    return data ? JSON.parse(data) : null;
  }

  saveBudget(budget: RequestData) {
    localStorage.setItem(this.getStorageKey(budget.id), JSON.stringify(budget));
    this.getBudgetSubject(budget.id).next(budget);
  }

  getCurrentBudget(requestId: number) {
    return this.getBudgetSubject(requestId).asObservable();
  }

  private getStorageKey(requestId: number): string {
    return `${this.STORAGE_KEY}_${requestId}`;
  }

  private getBudgetSubject(requestId: number): BehaviorSubject<RequestData | null> {
    if (!this.budgetSubjects.has(requestId)) {
      this.budgetSubjects.set(requestId, new BehaviorSubject<RequestData | null>(this.getBudget(requestId)));
    }
    return this.budgetSubjects.get(requestId)!;
  }

  private addToHistory(requestId: number, title: string) {
    const history = localStorage.getItem('requestHistory') ? 
      JSON.parse(localStorage.getItem('requestHistory')!) : [];
    
    const newHistoryEntry = {
      id: history.length + 1,
      title: title,
      date: new Date(),
      requestId: requestId,
      userId: 1, // Should be replaced with actual logged user ID
      statusId: 2 // 2 for APPROVED status
    };

    history.push(newHistoryEntry);
    localStorage.setItem('requestHistory', JSON.stringify(history));
  }

  updateStatus(requestId: number, status: 'APROVADA' | 'REJEITADA', rejectionReason?: string) {
    console.log('Updating status for request:', requestId, status, rejectionReason);
    let budget = this.getBudget(requestId);
    
    // Se não existir um orçamento, cria um novo
    if (!budget) {
      budget = {
        id: requestId,
        status: status,
        rejectionReason: rejectionReason,
      } as RequestData;
    } else {
      budget.status = status;
      budget.rejectionReason = rejectionReason;
    }
    
    console.log('Saving budget:', budget);
    this.saveBudget(budget);

    // Também atualiza o Request
    const requests = localStorage.getItem('requests');
    if (requests) {
      const parsedRequests = JSON.parse(requests);
      const request = parsedRequests.find((r: any) => r.id === requestId);
      if (request) {
        request.status = status;
        request.rejectionReason = rejectionReason;
        request.statusId = status === 'REJEITADA' ? 3 : 2;
        localStorage.setItem('requests', JSON.stringify(parsedRequests));
        console.log('Updated request:', request);
      }
    }

    // Add to history if request is being rescued (changing from REJECTED to APPROVED)
    if (status === 'APROVADA' && budget.status === 'REJEITADA') {
      this.addToHistory(requestId, 'Serviço resgatado: mudou de REJEITADA para APROVADA');
    }
  }
}
