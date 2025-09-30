import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Endereco {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}


@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  private readonly apiUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  buscarCep(cep: string): Observable<Endereco> {
    const cepLimpo = cep.replace(/\D/g, '');
    return this.http.get<Endereco>(`${this.apiUrl}/${cepLimpo}/json`);
  }
}
