import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../../../shared/models/category';
import { NewCategoryModalComponent } from "../new-category-modal/new-category-modal.component";

@Component({
  selector: 'app-manage-categories-page',
  imports: [CommonModule, NewCategoryModalComponent],
  templateUrl: './manage-categories-page.component.html',
  styleUrl: './manage-categories-page.component.css'
})
export class ManageCategoriesPageComponent implements OnInit {
  categories: Category[] = [];
  isModalShowing = false;
  selectedCategory: Category | null = null;

  constructor (private categoryService: CategoryService) { }  

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
  onModalSubmit(category: Category) : void {
    if (this.selectedCategory) {
      this.categoryService.updateCategory(category);
    } else {
      this.categoryService.addCategory(category);
    }
    this.getAllCategories();
    this.isModalShowing = false;
  }
  onModalClose() : void {
    this.isModalShowing = false;
  }

  deleteCategory(id: number) : void {
    this.categoryService.deleteCategory(id);
    this.getAllCategories();
  }
}