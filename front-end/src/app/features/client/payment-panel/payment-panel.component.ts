import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSuccessModalComponent } from '../../../shared/components/modal-mensagem/app-success-modal';
import { MaintenanceRequestService } from '../../../core/services/maintenance-request.service';
import { ToastService } from '../../../core/services/toast.service';
import { ClientRequestDetailDTO } from '../../../shared/models/maintenance-request.models';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

interface Pagamento {
  titulo: string;
  preco: number;
}

@Component({
  selector: 'app-payment-panel',
  templateUrl: './payment-panel.component.html',
  imports: [CommonModule, AppSuccessModalComponent, MatIcon, RouterModule],
  styleUrls: ['./payment-panel.component.css'],
})
export class PaymentPanelComponent implements OnInit {
  requests: ClientRequestDetailDTO | undefined;
  currentRequestId!: number;

  isLoading = true;
  selectedMethod: 'cartao' | 'pix' | null = null;
  mostrarModal = false;

  data = new Date();
  modalTitulo = 'Pagamento realizado com sucesso!';
  modalSubtitulo = '';
  modalDadosAdicionais = '';
  modalTextoBotao = 'Voltar para Página Inicial';
  modalRotaDestino = '/client/dashboard/';

  constructor(private requestService: MaintenanceRequestService, private toast: ToastService, private route: ActivatedRoute) {}

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
        this.requests = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading request details:', err);
        this.toast.error('Erro', 'Falha ao carregar detalhes da solicitação!');
        this.isLoading = false;
      },
    });
  }

  selectMethod(method: 'cartao' | 'pix') {
    this.selectedMethod = method;
  }

  payRequest(): void {
    if (!this.selectedMethod) {
      alert('Selecione uma forma de pagamento antes de continuar.');
      return;
    }
    this.requestService.payRequest(this.currentRequestId).subscribe({
      next: () => {
        this.toast.success('Sucesso', 'Solicitação paga com sucesso!');
        this.loadRequestDetails(this.currentRequestId);
        this.mostrarModal = true;
      },
      error: (err) => {
        console.error('Error paying request:', err);
        this.toast.error('Erro', 'Falha ao processar o pagamento da solicitação!');
      },
    });
    this.atualizarDataConfirmacao();
    
  }

 

 

  private atualizarDataConfirmacao(): void {
    const now = new Date();
    this.modalDadosAdicionais = `Data: ${now.toLocaleDateString(
      'pt-BR'
    )} às ${now.toLocaleTimeString('pt-BR')}`;
  }
}
