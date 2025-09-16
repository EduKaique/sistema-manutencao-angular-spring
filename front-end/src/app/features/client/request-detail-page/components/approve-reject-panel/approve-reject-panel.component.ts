import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BudgetService } from '../../../../../services/budget.service';
import { RequestData } from '../../../../../shared/models/request-data';

@Component({
  selector: 'app-approve-reject-panel',
  templateUrl: './approve-reject-panel.component.html',
  styleUrls: ['./approve-reject-panel.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true
})
export class ApproveRejectPanelComponent implements OnInit {
  budget?: RequestData | null;

  constructor(private budgetService: BudgetService,
              private router: Router) {}

  ngOnInit(): void {
    this.budget = this.budgetService.getBudget();
  }

  aprovar() {
    if (!this.budget) return;
    this.budgetService.updateStatus('APROVADA');
    alert(`Serviço Aprovado no Valor R$ ${this.budget.valor}`);
  }

  reprovar() {
    const motivo = prompt('Informe o motivo da rejeição:');
    if (motivo) {
      this.budgetService.updateStatus('REJEITADA');
      alert('Serviço Rejeitado');
    }
  }
}