import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-employee-dashboard-page',
  imports: [CommonModule, MatGridListModule],
  templateUrl: './employee-dashboard-page.component.html',
  styleUrl: './employee-dashboard-page.component.css',
})
export class EmployeeDashboardPageComponent {
  openRequests = 4;
  overdueRequests = 1;
  noResponsible = 2;
  createdToday = 3;

  requests = [
    {
      title: 'Notebook Dell Inspiron 15',
      openedAgo: '28 horas',
      category: 'Notebook',
      client: 'Nilson Nativus',
      status: '',
    },
    {
      title: 'Troca de tela do celular',
      openedAgo: '2 horas',
      category: 'Celular',
      client: 'Renata Montano',
      status: '',
    },
    {
      title: 'Formatação e backup',
      openedAgo: '6 minutos',
      category: 'Sistema Operacional',
      client: 'Floury Nations',
      status: 'Sem Responsável',
    },
    {
      title: 'Teclado Mecânico',
      openedAgo: '4 minutos',
      category: 'Equipamento',
      client: 'Razet Montano',
      status: 'Sem Responsável',
    },
  ];

  makeQuote(request: any) {
    console.log('Efetuando orçamento para:', request.title);
    // Aqui você pode abrir um modal ou navegar para outra página
  }
}
