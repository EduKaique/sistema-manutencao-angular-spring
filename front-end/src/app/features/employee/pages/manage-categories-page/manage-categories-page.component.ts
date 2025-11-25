import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../../../shared/models/category';
import { NewCategoryModalComponent } from '../../components/new-category-modal/new-category-modal.component';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { WarningDialogComponent } from '../../../../shared/components/warning-dialog/warning-dialog.component';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-manage-categories-page',
  imports: [CommonModule, NewCategoryModalComponent, MatIcon],
  templateUrl: './manage-categories-page.component.html',
  styleUrls: ['./manage-categories-page.component.css'],
})
export class ManageCategoriesPageComponent implements OnInit {
  categories: Category[] = [];
  isModalShowing = false;
  selectedCategory: Category | null = null;

  constructor(private categoryService: CategoryService, private dialog: MatDialog, private toast: ToastService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data: Category[]) => (this.categories = data),
      error: (err: unknown) => {
        console.error('Erro ao carregar categorias', err);
        this.toast.error('Erro', 'Erro ao carregar categorias: ' + err);
      }
    });
  }

  openNewCategoryModal(): void {
    this.selectedCategory = null;
    this.isModalShowing = true;
  }

  editCategory(category: Category): void {
    this.selectedCategory = { ...category }; // cria uma cópia
    this.isModalShowing = true;
  }

  onModalSubmit(category: Category): void {
    if (this.selectedCategory) {
      this.categoryService.updateCategory(category).subscribe({
        next: () => {
          this.getAllCategories();
          this.isModalShowing = false;
          this.toast.success('Sucesso', 'Categoria atualizada com sucesso');
        },
        error: (err: unknown) => {
          this.toast.error('Erro', 'Erro ao atualizar categoria: ' + err);
          console.error('Erro ao atualizar categoria', err);
        } 
      });
    } else {
      this.categoryService.addCategory(category).subscribe({
        next: () => {
          this.getAllCategories();
          this.isModalShowing = false;
          this.toast.success('Sucesso', 'Categoria adicionada com sucesso');
        },
        error: (err: unknown) => {
          this.toast.error('Erro', 'Erro ao adicionar categoria: ' + err);
          console.error('Erro ao atualizar categoria', err);
        }
      });
    }
  }

  onModalClose(): void {
    this.isModalShowing = false;
  }

  deleteCategory(id: number): void {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: {
        title: 'Confirmar exclusão',
        message: 'Tem certeza que deseja excluir esta categoria?',
      },
    });

    dialogRef.afterClosed().subscribe((result: unknown) => {
      if (result) {
        this.categoryService.deleteCategory(id).subscribe(() => {
          this.getAllCategories();
          this.toast.success('Sucesso', 'Categoria excluída com sucesso');
        });
      }
    });
  }
}