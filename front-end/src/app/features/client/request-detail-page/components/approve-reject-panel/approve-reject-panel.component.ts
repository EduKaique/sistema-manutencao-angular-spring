import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BudgetService } from '../../../../../core/services/budget.service';
import { Request } from '../../../../../shared/models/request';
import { RejectModalComponent } from '../../../../../shared/components/reject-modal/reject-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approve-reject-panel',
  templateUrl: './approve-reject-panel.component.html',
  styleUrls: ['./approve-reject-panel.component.css'],
  imports: [CommonModule, RejectModalComponent],
})
export class ApproveRejectPanelComponent implements OnInit {
  @Input() request?: Request;
  showRejectModal = false;
  budget?: any = null;
  hasBudget = false;

  constructor(private budgetService: BudgetService, private router: Router) {}

  ngOnInit(): void {
    if (this.request) {
      console.log('Initial request state:', this.request);
      this.budgetService
        .getCurrentBudget(this.request.id)
        .subscribe((budget) => {
          console.log('Budget updated:', budget);
          this.budget = budget;
          this.hasBudget = !!budget && !!budget.valor;
          
          if (budget && this.request) {
            this.request.status = budget.status;
            this.request.rejectionReason = budget.rejectionReason;
            console.log('Request after update:', this.request);
          }
        });
    }
  }

  resgatarServico() {
    if (!this.request) return;
    this.budgetService.updateStatus(this.request.id, 'APROVADA');
    
    Swal.fire({
      title: 'Resgatado!',
      text: 'Serviço foi resgatado e aprovado!',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#25A46B'
    });
  }

  aprovar() {
    if (!this.request) return;
    this.budgetService.updateStatus(this.request.id, 'APROVADA');
    
    Swal.fire({
      title: 'Sucesso!',
      text: 'Serviço foi aprovado!',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#25A46B'
    });
  }

  onRejectConfirm(reason: string) {
    if (!this.request) return;
    console.log('Rejecting request with reason:', reason);
    this.budgetService.updateStatus(this.request.id, 'REJEITADA', reason);
    console.log('Request after rejection:', this.request);
    this.showRejectModal = false;
    
    Swal.fire({
      title: 'Rejeitado!',
      text: 'Serviço foi rejeitado',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#FF5E5B'
    });
  }

  onRejectCancel() {
    this.showRejectModal = false;
  }

  getStatusText(): string {
    if (!this.request) return '';

    switch (this.request.status) {
      case 'REJEITADA':
        return 'REJEITADA';
      case 'APROVADA':
        return 'APROVADA';
      default:
        if (this.hasBudget) {
          return 'ORÇADA - Aguardando aprovação';
        } else {
          return 'ABERTA - Aguardando orçamento';
        }
    }
  }
}
