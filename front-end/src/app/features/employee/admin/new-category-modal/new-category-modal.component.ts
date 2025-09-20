import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Category } from '../../../../shared/models/category';

@Component({
  selector: 'app-new-category-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-category-modal.component.html',
  styleUrl: './new-category-modal.component.css'
})
export class NewCategoryModalComponent implements OnInit{
  @Input() editingCategory: Category | null = null;
  @Output() submitted = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();

  category: Category = {id: 0, nome: '', icone: ''};

  ngOnInit(): void {
    if (this.editingCategory) {
      this.category = { ...this.editingCategory };
    }
  }

  onSubmit(form: NgForm) : void{
    if (form.valid) {
      this.submitted.emit(this.category);
    }
  }

  confirmClose(): void {
      this.closeModal.emit();
  }

}
