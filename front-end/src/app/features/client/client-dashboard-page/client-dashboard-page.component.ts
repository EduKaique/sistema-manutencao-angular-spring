import { Component, OnInit, AfterViewInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { NewRequestPageComponent } from '../new-request-page/new-request-page.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaintenanceRequestService as RequestService } from '../../../core/services/maintenance-request.service';
import { MaintenanceRequestResponseDTO as Request } from '../../../shared/models/maintenance-request.models';
import { CommonModule } from '@angular/common';
import { StatusService } from '../../../core/services/status.service';
import { HeaderComponent } from '../../../core/layout/header/header.component';
import { CategoryService } from '../../employee/services/category.service';
import { MatSort } from '@angular/material/sort';
import { BudgetService } from '../../../core/services/budget.service';
import { Category } from '../../../shared/models/category';
import { ToastService } from '../../../core/services/toast.service';
import { MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-client-dashboard-page',

  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    CommonModule,
    HeaderComponent,
    MatIcon,
    MatSortModule,
  ],
  templateUrl: './client-dashboard-page.component.html',
  styleUrl: './client-dashboard-page.component.css',
})
export class ClientDashboardPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'equipmentName',
    'categoryId',
    'requestDate',
    'status',
    'acoes',
  ];
  dataSource = new MatTableDataSource<Request>();
  requests: Request[] = [];
  categories: Category[] = [];
  private toast = inject(ToastService);
  

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private requestService: RequestService,
    private statusService: StatusService,
    private router: Router,
    private categoryService: CategoryService,
    private budgetService: BudgetService,
  ) {}

  categoryMap: Record<number, string> = {};

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    this.requestService.getAllClientRequests().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      },
      error: (err) => console.error('Erro ao buscar solicitações', err)
    });
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

    setTimeout(() => {
      this.sort.active = 'requestDate';
      this.sort.direction = 'desc';
      this.sort.sortChange.emit();
    });
  }

  getCategoryName(id: number): string {
    return this.categoryMap[id] || '';
  }

  getStatusName(id: number): string {
    let result = '';
    this.statusService.getById(id).subscribe(status => {
      result = status?.nome || '';
    });
    return result;
  }

  getStatusColor(id: number): string {
    let result = '';
    this.statusService.getById(id).subscribe(status => {
      result = status?.cor || '';
    });
    return result;
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
        this.loadRequests();
      } 
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement)?.value || '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  remover(request: Request): void {
    if (confirm('Deseja realmente excluir essa solicitação?')) {
      this.loadRequests();
    }
  }

  verServico(id: number) {

    this.router.navigate(['/client/request-detail', id]);
  }
}
