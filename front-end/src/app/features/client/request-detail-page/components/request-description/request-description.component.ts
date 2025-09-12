import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Request } from '../../../../../shared/models/request.model';

@Component({
  selector: 'app-request-description',
  imports: [CommonModule],
  templateUrl: './request-description.component.html',
  styleUrl: './request-description.component.css'
})
export class RequestDescriptionComponent {
 
  @Input() request: Request | undefined; 

}
