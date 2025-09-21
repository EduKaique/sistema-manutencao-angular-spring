import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; 
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  
  isExpanded = signal<boolean>(true);

  menuItems: MenuItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/employee-dashboard' },
    { icon: 'build', label: 'Solicitações', route: '/view-requests' },
    { icon: 'group', label: 'Funcionários', route: '/employee-list' },
    { icon: 'category', label: 'Categorias', route: '/categories' },
    { icon: 'assessment', label: 'Relatórios', route: '/reports' }
  ];

  toggleSidebar(): void {
    this.isExpanded.update(value => !value);
  }

}