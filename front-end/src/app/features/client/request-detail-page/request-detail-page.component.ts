import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestDescriptionComponent } from './components/request-description/request-description.component';
import { RequestHistoryComponent } from './components/request-history/request-history.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RequestService } from '../../../core/services/request.service';
import { Request } from '../../../shared/models/request';
import { MatIconModule } from '@angular/material/icon';
import { ApproveRejectPanelComponent } from './components/approve-reject-panel/approve-reject-panel.component';
import { HeaderComponent } from '../../../core/layout/header/header.component';

@Component({
  selector: 'app-request-detail-page',
  imports: [
    RequestDescriptionComponent,
    RequestHistoryComponent,
    CommonModule,
    MatIconModule,
    RouterModule,
    ApproveRejectPanelComponent,
    HeaderComponent,
  ],
  templateUrl: './request-detail-page.component.html',
  styleUrl: './request-detail-page.component.css',
})
export class RequestDetailPageComponent implements OnInit {
  request: Request | undefined;
  currentRequestId!: number;

  constructor(
    private route: ActivatedRoute, // parâmetros da rota
    private requestService: RequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.currentRequestId = Number(id);
      this.request = this.requestService.buscarPorId(Number(id));
    }
  }

  backToDashboard(): void {
    this.router.navigate(['/client/dashboard']);
  }
}
