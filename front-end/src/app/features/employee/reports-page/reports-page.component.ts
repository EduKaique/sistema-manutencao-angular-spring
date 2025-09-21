import { Component } from '@angular/core';
import { HeaderComponent } from '../../../core/layout/header/header.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-reports-page',
  imports: [HeaderComponent, MatIcon],
  templateUrl: './reports-page.component.html',
  styleUrl: './reports-page.component.css'
})
export class ReportsPageComponent {

  isReportsTotalView: boolean = true;

  toggleView() {
    this.isReportsTotalView = !this.isReportsTotalView;
  }
}
