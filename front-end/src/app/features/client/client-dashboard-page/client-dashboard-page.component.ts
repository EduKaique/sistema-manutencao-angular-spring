import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewRequestPageComponent } from '../new-request-page/new-request-page.component';

@Component({
  selector: 'app-client-dashboard-page',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './client-dashboard-page.component.html',
  styleUrl: './client-dashboard-page.component.css'
})
export class ClientDashboardPageComponent {
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
}
