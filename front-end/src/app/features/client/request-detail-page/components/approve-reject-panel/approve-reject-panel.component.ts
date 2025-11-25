import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BudgetService } from '../../../../../core/services/budget.service';
import { ClientRequestDetailDTO } from '../../../../../shared/models/maintenance-request.models';
import { RejectModalComponent } from '../../../../../shared/components/reject-modal/reject-modal.component';
import Swal from 'sweetalert2';
import { MaintenanceRequestService } from '../../../../../core/services/maintenance-request.service';
import { ToastService } from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-approve-reject-panel',
  templateUrl: './approve-reject-panel.component.html',
  styleUrls: ['./approve-reject-panel.component.css'],
  imports: [CommonModule, RejectModalComponent],
})
export class ApproveRejectPanelComponent {
  @Input() request!: ClientRequestDetailDTO;
  @Output() statusChanged = new EventEmitter<void>();

  showRejectModal = false;
  rejectionReason = '';

  constructor(private budgetService: BudgetService, private router: Router, private requestService: MaintenanceRequestService, 
    private toast: ToastService,
  ) {}


  onApprove() {
    if (confirm('Tem certeza que deseja APROVAR este orçamento? O serviço será iniciado.')) {
      this.requestService.approveBudget(this.request.id).subscribe({
        next: () => {
          this.toast.success('Sucesso', 'Orçamento aprovado! O técnico iniciará o serviço.');
          this.statusChanged.emit(); 
        },
        error: (err) => {
          console.error(err);
          this.toast.error('Erro', 'Não foi possível aprovar o orçamento.');
        }
      });
    }
  }

  openRejectModal() {
    this.rejectionReason = '';
    this.showRejectModal = true;
  }

  confirmRejection() {
    if (!this.rejectionReason.trim()) {
      this.toast.warn('Atenção', 'Informe o motivo da recusa.');
      return;
    }

    this.requestService.rejectBudget(this.request.id, this.rejectionReason).subscribe({
      next: () => {
        this.toast.success('Recusado', 'Orçamento recusado com sucesso.');
        this.showRejectModal = false;
        this.statusChanged.emit(); 
      },
      error: (err) => {
        console.error(err);
        this.toast.error('Erro', 'Falha ao recusar orçamento.');
      }
    });
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

  onRejectCancel() {
    this.showRejectModal = false;
  }

}
