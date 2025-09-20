import { Injectable } from '@angular/core';
import { Category } from '../../../shared/models/category';

const LS_KEY_c = "categories";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getAllCategories() : Category[] {
    const categories = localStorage[LS_KEY_c];
    return categories ? JSON.parse(categories) : [];
  }

  addCategory(category: Category) : void {
    const categories = this.getAllCategories();
    category.id = new Date().getTime(); 
    categories.push(category);
    localStorage[LS_KEY_c] = JSON.stringify(categories);
  }

  getById(id: number): Category | undefined {
    const categories = this.getAllCategories();
    return categories.find(category => category.id === id);
  }

  updateCategory (category: Category) : void {
    const categories = this.getAllCategories();
    categories.forEach ( (obj, index, objs) => {
      if (category.id === obj.id) {
        objs[index] = category
      }
    });
    localStorage [LS_KEY_c] = JSON.stringify(categories);
  } 

  deleteCategory (id: number) : void {
    let categories = this.getAllCategories();
    categories = categories.filter(category => category.id !== id);
    localStorage[LS_KEY_c] = JSON.stringify(categories);
  }
}
