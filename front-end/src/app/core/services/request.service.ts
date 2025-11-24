  import { Injectable } from '@angular/core';
import { Request } from '../../shared/models/request';
import { RequestHistory } from '../../shared/models/request-history';
import { RequestHistoryService } from './request-history.service';
import { StatusService } from './status.service';
import { REQUESTS } from '../../shared/mocks/request.mock';
import { firstValueFrom } from 'rxjs';

const LS_CHAVE = 'requests';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(
    private requestHistoryService: RequestHistoryService,
    private statusService: StatusService
  ) {}

  listarTodos(): Request[] {
    const requests = localStorage.getItem(LS_CHAVE);
    return requests ? JSON.parse(requests) : REQUESTS;
  }

  inserir(request: Request): void {
    const requests = this.listarTodos();
    request.id = new Date().getTime();
    request.statusId = 1;
    request.requestDate = new Date();
    request.clientId = 1;
    requests.push(request);
    localStorage[LS_CHAVE] = JSON.stringify(requests);

    const inicialEntry: RequestHistory = {
      id: 0,
      title: 'Solicitação criada',
      date: request.requestDate,
      requestId: request.id,
      userId: 1, //usuario logado
      statusId: request.statusId,
    };
    this.requestHistoryService.addHistory(inicialEntry);
  }

  buscarPorId(id: number): Request | undefined {
    const requests: Request[] = this.listarTodos();
    return requests.find((request) => request.id === id);
  }

  async atualizar(request: Request): Promise<void> {
  const requests = this.listarTodos();

  for (const [index, obj] of requests.entries()) {
    if (request.id === obj.id) {

      const oldStatusId = obj.statusId;
      const newStatusId = request.statusId;

      if (oldStatusId !== newStatusId) {

        const oldStatus = await firstValueFrom(
          this.statusService.getById(oldStatusId)
        );

        const newStatus = await firstValueFrom(
          this.statusService.getById(newStatusId)
        );

        const description = `Status atualizado de ${oldStatus?.name} para ${newStatus?.color}`;

        const entry: RequestHistory = {
          id: 0,
          title: description,
          date: new Date(),
          requestId: request.id,
          userId: 1,
          statusId: request.statusId,
        };

        this.requestHistoryService.addHistory(entry);
      }

      requests[index] = request;
    }
  }

  localStorage[LS_CHAVE] = JSON.stringify(requests);
}

  remover(id: number): void {
    let requests: Request[] = this.listarTodos();
    requests = requests.filter((request) => request.id !== id);
    localStorage[LS_CHAVE] = JSON.stringify(requests);
  }
}
