import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewRequestPageComponent } from '../new-request-page/new-request-page.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RequestService } from '../../../core/services/request.service';
import { Request } from '../../../shared/models/request.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-dashboard-page',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    CommonModule
  ],
  templateUrl: './client-dashboard-page.component.html',
  styleUrl: './client-dashboard-page.component.css'
})
export class ClientDashboardPageComponent implements OnInit{
  displayedColumns: string[] = ['equipamento', 'categoria', 'dataCriacao', 'ultimaAtualizacao', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Request>(); 
  requests : Request[] = [];
  
  constructor(
    private dialog: MatDialog,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.requests = this.listarTodos();
    this.dataSource.data = this.requests;
  }

  openNewRequest() {
    const dialogRef = this.dialog.open(NewRequestPageComponent, {
      width: '565px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Solicitação enviada', result);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement)?.value || '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  listarTodos(): Request[] {
    //return this.requestService.listarTodos();
    return [
      new Request(1, 'Equipamento 1', 'Categoria 1', '2023-01-01', '2023-01-02', 'Defeito 1', 'Pendente'),
      new Request(2, 'Equipamento 2', 'Categoria 2', '2023-02-01', '2023-02-02', 'Defeito 2', 'Concluida'),
    ];
  }
}

