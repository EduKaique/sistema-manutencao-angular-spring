import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-reports-page',
  imports: [MatIcon],
  templateUrl: './reports-page.component.html',
  styleUrl: './reports-page.component.css'
})
export class ReportsPageComponent {

  isReportsTotalView: boolean = true;

  toggleView() {
    this.isReportsTotalView = !this.isReportsTotalView;
  }
}
