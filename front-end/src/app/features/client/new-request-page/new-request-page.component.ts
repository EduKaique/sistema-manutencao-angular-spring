import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-request-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-request-page.component.html',
  styleUrls: ['./new-request-page.component.css']
})
export class NewRequestPageComponent {
  
  constructor(public dialogRef: MatDialogRef<NewRequestPageComponent>) {}

  confirmCloseRequest() {
    const confirmation = confirm('Tem certeza que deseja fechar a solicitação?');
    if (confirmation) {
      this.dialogRef.close();
    }
  }
  send(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(form.value); 
      console.log('Solicitação enviada', form.value);
    } else {
      alert('Preencha todos os campos'); 
    }
  }
}