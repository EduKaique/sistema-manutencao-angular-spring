import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Request } from '../../../shared/models/request.model';
import { RequestService } from '../../../core/services/request.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-request-page',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './new-request-page.component.html',
  styleUrl: './new-request-page.component.css',
})
export class NewRequestPageComponent {

  @ViewChild('formRequest') formRequest! : NgForm;
  request: Request = new Request();
  
  constructor(
    public dialogRef: MatDialogRef<NewRequestPageComponent>,
    private requestService: RequestService,
    private router : Router
    ) {}

  confirmCloseRequest() {
    const confirmation = confirm('Tem certeza que deseja fechar a solicitação?');
    if (confirmation) {
      this.dialogRef.close();
    }
  }
  send(form: NgForm) {
    if (form.valid) {
      this.requestService.inserir(this.request);
      console.log('Solicitação enviada', form.value);
      this.dialogRef.close(this.request); 
      this.router.navigate(['/client/dashboard']);
    } else {
      alert('Preencha todos os campos'); 
    }
  }
}