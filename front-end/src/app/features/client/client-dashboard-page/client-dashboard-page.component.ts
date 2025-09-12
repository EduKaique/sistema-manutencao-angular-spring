import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    CommonModule,
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
    private requestService: RequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requests = this.requestService.listarTodos();
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
        this.requests = this.listarTodos();
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

  remover($event: any, request: Request) : void {
      $event.preventDefault();
      if(confirm('Deseja realmente excluir essa solicitação?')) {
            this.requestService.remover(request.id!);
            this.requests = this.listarTodos();
            this.dataSource.data = this.requests;
      }
    }

    verServico(id: string) {
      console.log('Tentando navegar para:', `/request-detail/${id}`);

      this.router.navigate(['/request-detail', id]);
    }
}

