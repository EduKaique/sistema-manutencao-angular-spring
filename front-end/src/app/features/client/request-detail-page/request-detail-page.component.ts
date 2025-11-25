import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestDescriptionComponent } from './components/request-description/request-description.component';
import { RequestHistoryComponent } from './components/request-history/request-history.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaintenanceRequestService } from '../../../core/services/maintenance-request.service';
import { ClientRequestDetailDTO } from '../../../shared/models/maintenance-request.models';
import { MatIconModule } from '@angular/material/icon';
import { ApproveRejectPanelComponent } from './components/approve-reject-panel/approve-reject-panel.component';
import { HeaderComponent } from '../../../core/layout/header/header.component';
import { ToastService } from '../../../core/services/toast.service';

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
  request!: ClientRequestDetailDTO;
  currentRequestId!: number;
  toast = inject(ToastService);

  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private requestService: MaintenanceRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.currentRequestId = Number(id);
      this.loadRequestDetails(this.currentRequestId);
    }
  }

  loadRequestDetails(id: number): void {
    this.requestService.getRequestByIdForClient(id).subscribe({
      next: (data) => {
        this.request = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading request details:', err);
        this.toast.error('Erro', 'Falha ao carregar detalhes da solicitação!');
        this.isLoading = false;
      },
    });
  }

  goToPaymentPage(): void {
    this.router.navigate(['/client/request-detail', this.currentRequestId, 'payment']);
  }


  backToDashboard(): void {
    this.router.navigate(['/client/dashboard']);
  }
}
