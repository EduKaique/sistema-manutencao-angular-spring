import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRequestDetailDTO } from '../../../../../shared/models/maintenance-request.models';
import { StatusService } from '../../../../../core/services/status.service';
import { Status } from '../../../../../shared/models/status';
import { CategoryService } from '../../../../employee/services/category.service';
import { Category } from '../../../../../shared/models/category';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-request-description',
  imports: [CommonModule, MatIcon],
  templateUrl: './request-description.component.html',
  styleUrl: './request-description.component.css',
})
export class RequestDescriptionComponent implements OnInit {
  @Input() request!: ClientRequestDetailDTO;
  categoryName: string = '';

  constructor(
    private statusService: StatusService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategoryName();
  }


  loadCategoryName(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categoryName = this.request.categoryName;
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
