import { Component, Input } from '@angular/core';
import { Request } from '../../../../../shared/models/request';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-request-card',
  imports: [DatePipe, MatIcon],
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.css'
})
export class RequestCardComponent {
  @Input({ required: true }) request!: Request;

  
}
