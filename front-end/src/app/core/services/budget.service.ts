import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RequestData } from '../../shared/models/request-data';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private STORAGE_KEY = 'orcamentos';
  private budgetSubjects = new Map<
    number,
    BehaviorSubject<RequestData | null>
  >();

  getBudget(requestId: number): RequestData | null {
    const data = localStorage.getItem(this.getStorageKey(requestId));
    if (data) {
      return JSON.parse(data);
    }
    
    if (this.shouldAutoGenerate()) {
      return this.generateMockBudget(requestId);
    }
    
    return null;
  }

  private generateMockBudget(requestId: number): RequestData {
    const seed = requestId % 1000;
    const valores = [320.00, 450.00, 520.00, 680.00, 750.00, 890.00, 1200.00];
    const prazos = ['1-2 dias úteis', '2-3 dias úteis', '2-5 dias úteis', '3-7 dias úteis', '5-10 dias úteis'];
    const servicos = [
      'Diagnóstico técnico completo, Limpeza interna',
      'Substituição de componente, Mão de obra especializada',
      'Diagnóstico técnico completo, Substituição do cabo flat da tela, Mão de obra especializada, Limpeza interna + aplicação de pasta térmica',
      'Reparo de placa-mãe, Substituição de capacitores, Testes completos',
      'Troca de tela, Calibração, Proteção adicional',
      'Formatação completa, Instalação de sistema, Configuração de software'
    ];

    const budget: RequestData = {
      id: requestId,
      equipmentName: '',
      equipmentDescription: '',
      requestDate: new Date(),
      statusId: 1,
      categoryId: 1,
      clientId: 1,
      employeeId: 1,
      valor: valores[seed % valores.length],
      status: '',
      prazo: prazos[seed % prazos.length],
      servicos: servicos[seed % servicos.length]
    };

    this.saveBudget(budget);
    return budget;
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

  private getBudgetSubject(
    requestId: number
  ): BehaviorSubject<RequestData | null> {
    if (!this.budgetSubjects.has(requestId)) {
      this.budgetSubjects.set(
        requestId,
        new BehaviorSubject<RequestData | null>(this.getBudget(requestId))
      );
    }
    return this.budgetSubjects.get(requestId)!;
  }

  private addToHistory(requestId: number, title: string) {
    const history = localStorage.getItem('requestHistory')
      ? JSON.parse(localStorage.getItem('requestHistory')!)
      : [];

    const newHistoryEntry = {
      id: history.length + 1,
      title: title,
      date: new Date(),
      requestId: requestId,
      userId: 1,
      statusId: 2
    };

    history.push(newHistoryEntry);
    localStorage.setItem('requestHistory', JSON.stringify(history));
  }


  createBudget(requestId: number, budgetData: {
    valor: number;
    prazo?: string;
    servicos?: string;
  }): void {
    const budget: RequestData = {
      id: requestId,
      equipmentName: '',
      equipmentDescription: '',
      requestDate: new Date(),
      statusId: 1,
      categoryId: 1,
      clientId: 1,
      employeeId: 1,
      valor: budgetData.valor,
      status: '',
      prazo: budgetData.prazo,
      servicos: budgetData.servicos
    };
    
    this.saveBudget(budget);
  }


  enableAutoGenerateBudgets(): void {
    localStorage.setItem('autoGenerateBudgets', 'true');
  }

  disableAutoGenerateBudgets(): void {
    localStorage.setItem('autoGenerateBudgets', 'false');
  }

  private shouldAutoGenerate(): boolean {
    const setting = localStorage.getItem('autoGenerateBudgets');
    return setting !== 'false';
  }

  updateStatus(
    requestId: number,
    status: 'APROVADA' | 'REJEITADA',
    rejectionReason?: string
  ) {
    
    let budget = this.getBudget(requestId);


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

    this.saveBudget(budget);


    const requests = localStorage.getItem('requests');
    if (requests) {
      const parsedRequests = JSON.parse(requests);
      const request = parsedRequests.find((r: any) => r.id === requestId);
      if (request) {
        request.status = status;
        request.rejectionReason = rejectionReason;
        request.statusId = status === 'REJEITADA' ? 3 : 2;
        localStorage.setItem('requests', JSON.stringify(parsedRequests));
      }
    }

    if (status === 'APROVADA' && budget.status === 'REJEITADA') {
      this.addToHistory(
        requestId,
        'Serviço resgatado: mudou de REJEITADA para APROVADA'
      );
    }
  }
}
