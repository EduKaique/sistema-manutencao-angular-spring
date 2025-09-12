import { Injectable } from '@angular/core';
import { Request } from '../../shared/models/request';

const LS_CHAVE = "requests";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor() { }

  listarTodos(): Request[] {
    const requests = localStorage[LS_CHAVE];
    return requests ? JSON.parse(requests) : [];
  }

  inserir(request: Request): void {
    const requests = this.listarTodos();
    request.id = new Date().getTime().toString();
    request.status = "Aberta";
    request.dataCriacao = new Date().toLocaleString();
    requests.push(request);
    localStorage[LS_CHAVE] = JSON.stringify(requests);
  }

  buscarPorId(id: string): Request | undefined {
    const requests: Request[] = this.listarTodos();
    console.log('ID que o serviço está procurando:', id); // Verifique o ID aqui
    console.log('IDs disponíveis no Local Storage:', requests.map(r => r.id)); // Compare os IDs
    return requests.find(request => request.id === id);
  }

  atualizar(request: Request): void {
    const requests = this.listarTodos();
    requests.forEach((obj, index, objs) => {
      if (request.id === obj.id) {
        objs[index] = request;
      }
    });
    localStorage[LS_CHAVE] = JSON.stringify(requests);
  }

  remover(id: string): void {
    let requests: Request[] = this.listarTodos();
    requests = requests.filter(request => request.id !== id);
    localStorage[LS_CHAVE] = JSON.stringify(requests);
  }
}
