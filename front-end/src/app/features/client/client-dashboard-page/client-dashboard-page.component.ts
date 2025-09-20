import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewRequestPageComponent } from '../new-request-page/new-request-page.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RequestService } from '../../../shared/services/request.service';
import { Request } from '../../../shared/models/request';
import { CommonModule } from '@angular/common';
import { StatusService } from '../../../shared/services/status.service';
import { HeaderComponent } from '../../../core/layout/header/header.component';


@Component({
  selector: 'app-client-dashboard-page',
  standalone: true,
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

export class ClientDashboardPageComponent implements OnInit {
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

  constructor(
    private dialog: MatDialog,
    private requestService: RequestService,
    private statusService: StatusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requests = this.requestService.listarTodos();
    this.dataSource.data = this.requests;
  }
// possível substituição por pipes:
    getStatusName(id: number): string {
      return this.statusService.getById(id)?.nome || '';
    }

    getStatusColor(id: number): string {
      return this.statusService.getById(id)?.cor || '';
    }

  openNewRequest() {
    const dialogRef = this.dialog.open(NewRequestPageComponent, {
      width: '565px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Solicitação enviada', result);
        this.requests = this.requestService.listarTodos();
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
      if(confirm('Deseja realmente excluir essa solicitação?')) {
            this.requestService.remover(request.id!); 
            this.requests = this.listarTodos();
            this.dataSource.data = this.requests;
      }
    }

    verServico(id: number) {
      console.log('Tentando navegar para:', `/request-detail/${id}`);

      this.router.navigate(['/request-detail', id]);
    }
}

