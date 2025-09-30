import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Request } from '../../../shared/models/request';
import { RequestService } from '../../../core/services/request.service';
import { CategoryService } from '../../employee/services/category.service';
import { Category } from '../../../shared/models/category';

@Component({
  selector: 'app-new-request-page',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './new-request-page.component.html',
  styleUrl: './new-request-page.component.css',
})
export class NewRequestPageComponent implements OnInit {
  @ViewChild('formRequest') formRequest!: NgForm;
  categories: Category[] = [];
  request: Partial<Request> = {
    categoryId: undefined,
  };

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categories = this.categoryService.getAllCategories() || [];
  }

  constructor(
    public dialogRef: MatDialogRef<NewRequestPageComponent>,
    private requestService: RequestService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  confirmCloseRequest() {
    const confirmation = confirm(
      'Tem certeza que deseja fechar a solicitação?'
    );
    if (confirmation) {
      this.dialogRef.close();
    }
  }
  send(form: NgForm) {
    if (form.valid) {
      this.requestService.inserir(this.request as Request);
      console.log('Solicitação enviada', form.value);
      this.dialogRef.close(this.request);
      this.router.navigate(['/client/dashboard']);
    } else {
      alert('Preencha todos os campos');
    }
  }
}
