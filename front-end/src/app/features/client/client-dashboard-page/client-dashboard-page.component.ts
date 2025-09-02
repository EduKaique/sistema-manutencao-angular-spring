import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewRequestPageComponent } from '../new-request-page/new-request-page.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface Client {
  nome: string;
  categoria: string;
  Data: Date;
  Atualizacao: string;
  Atual: string; 
  Acao : string;
}

@Component({
  selector: 'app-client-dashboard-page',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ],
  templateUrl: './client-dashboard-page.component.html',
  styleUrl: './client-dashboard-page.component.css'
})
export class ClientDashboardPageComponent {
  displayedColumns: string[] = ['nome', 'categoria', 'Data', 'Atualizacao', 'Atual', 'Acao'];
  dataSource = new MatTableDataSource<Client>();
  
  constructor(private dialog: MatDialog) {}

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
}

