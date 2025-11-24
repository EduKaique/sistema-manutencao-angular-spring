import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewRequestPageComponent } from '../new-request-page/new-request-page.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RequestService } from '../../../core/services/request.service';
import { Request } from '../../../shared/models/request';
import { CommonModule } from '@angular/common';
import { StatusService } from '../../../core/services/status.service';
import { HeaderComponent } from '../../../core/layout/header/header.component';
import { CategoryService } from '../../employee/services/category.service';
import { MatSort } from '@angular/material/sort';
import { BudgetService } from '../../../core/services/budget.service';

@Component({
  selector: 'app-client-dashboard-page',

  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    CommonModule,
    HeaderComponent,
  ],
  templateUrl: './client-dashboard-page.component.html',
  styleUrl: './client-dashboard-page.component.css',
})
export class ClientDashboardPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'equipmentName',
    'categoryId',
    'requestDate',
    //'lastAtualization',
    'statusId',
    'acoes',
  ];
  dataSource = new MatTableDataSource<Request>();
  requests: Request[] = [];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private requestService: RequestService,
    private statusService: StatusService,
    private router: Router,
    private categoryService: CategoryService,
    private budgetService: BudgetService
  ) {}

  categoryMap: Record<number, string> = {};

  ngOnInit(): void {
    this.requests = this.requestService.listarTodos().map(req => ({
      ...req,
      requestDate: new Date(req.requestDate),
    }));
    this.dataSource.data = this.requests;

    this.categoryService.getAllCategories().subscribe(categories => {
    categories.forEach(cat => {
      this.categoryMap[cat.id] = cat.name;
    });
  });
  }

  ngAfterViewInit(): void {
    this.sort.active = 'requestDate';
    this.sort.direction = 'desc';
    this.dataSource.sort = this.sort;
  }

  getCategoryName(id: number): string {
    return this.categoryMap[id] || '';
  }

  getStatusName(id: number): string {
    return this.statusService.getById(id)?.nome || '';
  }

  getStatusColor(id: number): string {
    return this.statusService.getById(id)?.cor || '';
  }

  getBudgetStatus(requestId: number): string {
    const budget = this.budgetService.getBudget(requestId);
    
    if (budget) {
      if (budget.status === 'APROVADA') return 'APROVADA';
      if (budget.status === 'REJEITADA') return 'REJEITADA';
      return 'ORÇADA';
    }
    
    return 'ABERTA';
  }

  getBudgetStatusColor(requestId: number): string {
    const status = this.getBudgetStatus(requestId);
    
    switch (status) {
      case 'APROVADA': return '#25A46B';
      case 'REJEITADA': return '#FF5E5B';
      case 'ORÇADA': return '#856404';
      case 'ABERTA': return '#6c757d';
      default: return '#6c757d';
    }
  }

  openNewRequest() {
    const dialogRef = this.dialog.open(NewRequestPageComponent, {
      width: '565px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Solicitação enviada', result);
        this.requests = this.requestService.listarTodos().map(req => ({
          ...req,
          requestDate: new Date(req.requestDate),
        }));
        this.dataSource.data = this.requests;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement)?.value || '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  listarTodos(): Request[] {
    return this.requestService.listarTodos();
  }

  remover(request: Request): void {
    if (confirm('Deseja realmente excluir essa solicitação?')) {
      this.requestService.remover(request.id!);
      this.requests = this.requestService.listarTodos().map(req => ({
        ...req,
        requestDate: new Date(req.requestDate),
      }));
      this.dataSource.data = this.requests;
    }
  }

  verServico(id: number) {
    console.log('Tentando navegar para:', `/client/request-detail/${id}`);

    this.router.navigate(['/client/request-detail', id]);
  }
}
