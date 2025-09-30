import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../../../shared/models/category';
import { NewCategoryModalComponent } from '../../components/new-category-modal/new-category-modal.component';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { WarningDialogComponent } from '../../../../shared/components/warning-dialog/warning-dialog.component';

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

  constructor(private categoryService: CategoryService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categories = this.categoryService.getAllCategories();
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
      this.categoryService.updateCategory(category);
    } else {
      this.categoryService.addCategory(category);
    }
    this.getAllCategories();
    this.isModalShowing = false;
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

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.deleteCategory(id);
        this.getAllCategories();
      }
    });
  }
}
