import { Component, Input, OnInit } from '@angular/core';
import { Request } from '../../../../../../shared/models/request';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CategoryService } from '../../../../services/category.service';
import { CLIENT_MOCKS } from '../../../../../../shared/mocks/user.mock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-card',
  imports: [DatePipe, MatIcon],
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.css',
})
export class RequestCardComponent implements OnInit {
  @Input({ required: true }) request!: Request;
  categoryMap: Record<number, string> = {};
  clientMap: Record<number, string> = {};

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categoryMap = categories.reduce<Record<number, string>>((acc, c) => {
        acc[c.id] = c.name;
        return acc;
      }, {});
  });

    this.clientMap = CLIENT_MOCKS.reduce<Record<number, string>>((acc, c) => {
      acc[c.clientid] = c.name;
      return acc;
    }, {});
  }

  verServico(id: number) {
    console.log('Tentando navegar para:', `/employee/budget-delivery/${id}`);

    this.router.navigate(['/employee/budget-delivery', id]);
  }
}
