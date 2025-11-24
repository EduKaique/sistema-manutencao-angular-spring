import { Component, OnInit, Inject, ViewChild, inject } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaintenanceRequestCreateDTO } from '../../../shared/models/maintenance-request.models';
import { MaintenanceRequestService } from '../../../core/services/maintenance-request.service';
import { CategoryService } from '../../employee/services/category.service'; 
import { Category } from '../../../shared/models/category'; 
import { MatIconModule } from '@angular/material/icon';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-new-request-page',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './new-request-page.component.html',
  styleUrl: './new-request-page.component.css',
})
export class NewRequestPageComponent implements OnInit {
  @ViewChild('formRequest') formRequest!: NgForm;

  private toast = inject(ToastService);
  
  categories: Category[] = [];

  request: MaintenanceRequestCreateDTO = {
    equipmentName: '',
    defectDescription: '',
    categoryId: null as any 
  };

  constructor(
    public dialogRef: MatDialogRef<NewRequestPageComponent>,
    private requestService: MaintenanceRequestService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (cats) => this.categories = cats,
      error: (err) => this.toast.error('Erro', 'Falha ao carregar categorias: ' + err)
    });
    console.log('Categorias carregadas:', this.categories);
  }

  confirmCloseRequest() {
    if (this.formRequest.dirty) {
      const confirmation = confirm('Tem certeza que deseja cancelar? Os dados serão perdidos.');
      if (confirmation) {
        this.dialogRef.close();
      }
    } else {
      this.dialogRef.close();
    }
  }

  send() {
    if (this.formRequest.invalid) {
      return; 
    }

    console.log('Enviando solicitação:', this.request);

    this.requestService.create(this.request).subscribe({
      next: (response) => {
        console.log('Solicitação criada com sucesso:', response);
        this.toast.success('Sucesso', 'Solicitação criada com sucesso!');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.toast.error('Erro', 'Falha ao criar solicitação' + err);
        console.error('Erro ao criar solicitação:', err);}
    });
  }
}