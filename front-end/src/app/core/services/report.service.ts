import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../configs/api.token';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private http = inject(HttpClient);
  private apiBaseUrl = inject(API_URL);
  
  private readonly apiUrl = `${this.apiBaseUrl}/reports`;

  /**
   * Lista de Receita por Período 
   * @param startDate 
   * @param endDate 
   * @returns  JSON com dados de receita por data
   */
  getRevenueByDateData(startDate: string, endDate: string) {
    const url = `${this.apiUrl}/date?start=${startDate}&end=${endDate}`;
    return this.http.get(url);
  }

  /**
   * Lista de Receita por Categoria 
   * @returns  JSON com dados de receita por categoria
   */
  getRevenueByCategoryData() {
    const url = `${this.apiUrl}/category`;
    return this.http.get(url);
  }

  /**
   * Gera relatório de receitas por data.
   * @param startDate 
   * @param endDate 
   * @returns PDF para download
   */
  generateRevenueByDateReport(startDate: string, endDate: string) {
    const url = `${this.apiUrl}/date/pdf?start=${startDate}&end=${endDate}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  /**
   * Gera relatório de receitas das categorias.
   * @returns PDF para download
   */
  generateCategoriesReport() {
    const url = `${this.apiUrl}/category/pdf`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
