import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ReportService } from '../../../../core/services/report.service';
import { ToastService } from '../../../../core/services/toast.service';
import { RevenueByCategory, RevenueByDate } from '../../../../shared/models/reports.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-reports-page',
  imports: [
    MatIcon,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,          
    ReactiveFormsModule,
    MatTableModule,
    CommonModule,
    MatPaginator
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './reports-page.component.html',
  styleUrl: './reports-page.component.css'
})
export class ReportsPageComponent implements OnInit {

  isReportsTotalView: boolean = true;
  revenueByDate: RevenueByDate[] = [];
  revenueByCategory: RevenueByCategory[] = [];
  datasource: MatTableDataSource<RevenueByDate> = new MatTableDataSource<RevenueByDate>(this.revenueByDate);
  range: FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['date', 'totalRevenue'];

  constructor(private reportService: ReportService, private toast: ToastService, private fb: FormBuilder,) { 
    this.range = this.fb.group({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
  }

  ngOnInit(): void {
    this.loadRevenueByCategoryData();
    this.loadRevenueByDateData('', '');
  }

  loadRevenueByDateData(startDate: string, endDate: string) {
    this.reportService.getRevenueByDateData(startDate, endDate).subscribe({
      next: (data) => {
        console.log('Dados de Receita por Data:', data);
        this.datasource = new MatTableDataSource<RevenueByDate>(data as RevenueByDate[]);
        this.datasource.paginator = this.paginator;
      },
      error: (error) => {
        this.toast.error('Erro', 'Erro ao carregar dados de receita por data: ' + error);
        console.error('Erro ao carregar dados de receita por data:', error);
      }
    });
  }

  get start() {
    return this.range.get('start')!;
  }

  get end() {
    return this.range.get('end')!;
  }

  loadRevenueByCategoryData() {
    this.reportService.getRevenueByCategoryData().subscribe({
      next: (data) => {
        console.log('Dados de Receita por Categoria:', data);
        this.revenueByCategory = data as RevenueByCategory[];
      },
      error: (error) => {
        this.toast.error('Erro', 'Erro ao carregar dados de receita por categoria: ' + error);
        console.error('Erro ao carregar dados de receita por categoria:', error);
      }
    });
  }

  generateRevenueByDateReport() {
    const start: Date | null = this.range.controls['start'].value;
    const end: Date | null = this.range.controls['end'].value;

    if ((start && !end) || (!start && end)) {
      this.toast.warn('Atenção', 'Selecione as duas datas do intervalo.');
      return;
    }

    if (!start && !end) {
      this.sendReportRequest('', '');
      return;
    }

    const startFormatted = this.formatDate(start!);
    const endFormatted = this.formatDate(end!);

    this.sendReportRequest(startFormatted, endFormatted);
  }

  private sendReportRequest(startDate: string, endDate: string) {
    this.reportService.generateRevenueByDateReport(startDate, endDate).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio_receitas_data.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Erro ao gerar relatório:', error);
        this.toast.error('Erro', 'Erro ao gerar relatório de receitas por data: ' + error);
      }
    });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }


  generateCategoriesReport() {
    this.reportService.generateCategoriesReport().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio_receitas_categorias.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Erro ao gerar relatório:', error);
        this.toast.error('Erro', 'Erro ao gerar relatório de receitas por categoria: ' + error);
      }
    });
  }

  toggleView() {
    this.isReportsTotalView = !this.isReportsTotalView;
  }
}
