import { Component } from '@angular/core';
import { RequestDescriptionComponent } from "./components/request-description/request-description.component";
import { RequestHistoryComponent } from "./components/request-history/request-history.component";

@Component({
  selector: 'app-request-detail-page',
  standalone: true,
  imports: [RequestDescriptionComponent, RequestHistoryComponent],
  templateUrl: './request-detail-page.component.html',
  styleUrl: './request-detail-page.component.css'
})
export class RequestDetailPageComponent {

}
