import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Request } from '../../../../../shared/models/request';
import { StatusService } from '../../../../../core/services/status.service';
import { Status } from '../../../../../shared/models/status';
import { CategoryService } from '../../../../employee/services/category.service';
import { Category } from '../../../../../shared/models/category';
@Component({
  selector: 'app-request-description',
  imports: [CommonModule],
  templateUrl: './request-description.component.html',
  styleUrl: './request-description.component.css',
})
export class RequestDescriptionComponent implements OnInit {
  @Input() request!: Request;
  status?: Status & { textColor: string };
  categoryName: string = '';

  constructor(
    private statusService: StatusService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategoryName();
  }

  getStatus(statusId: number): Status | undefined {
    return this.statusService.getById(statusId);
  }

  loadCategoryName(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
    const category = categories.find(c => c.id === this.request.categoryId);
    this.categoryName = category ? category.name : 'Categoria não encontrada';
  });
  }

  formatDate(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  }
}
