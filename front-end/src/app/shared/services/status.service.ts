import { Injectable } from '@angular/core';
import { Status } from '../models/status'

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statusList: Status[] = [
    { id: 1, nome: 'ABERTA', cor: "#627877"},
    { id: 2, nome: 'ORÇADA', cor: "#7C3804"},
    { id: 3, nome: 'REJEITADA', cor: "#FF5E5B"},
    { id: 4, nome: 'APROVADA', cor: "#FFAE36"},
    { id: 5, nome: 'REDIRECIONADA', cor: "#8A84E2"},
    { id: 6, nome: 'ARRUMADA', cor: "#2B3E61"},
    { id: 7, nome: 'PAGA', cor: "#EC7505"},
    { id: 8, nome: 'FINALIZADA', cor: "#136947"},
  ]

  getAll(): Status[] {
    return this.statusList;
  }

  getById(id: number): Status | undefined {
    return this.statusList.find(status => status.id === id);
  }
  
}
