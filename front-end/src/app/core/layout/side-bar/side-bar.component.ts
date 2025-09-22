import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarStateService } from '../../services/sidebar-state.service';

export interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-side-bar',
  imports: [CommonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  constructor(public sidebarState: SidebarStateService) {}

  get isExpanded() {
    return this.sidebarState.isExpanded;
  }

  menuItems: MenuItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/employee/dashboard' },
    { icon: 'build', label: 'Solicitações', route: '/employee/view-requests' },
    { icon: 'group', label: 'Funcionários', route: '/employee/employees-list' },
    { icon: 'category', label: 'Categorias', route: '/employee/categories' },
    { icon: 'assessment', label: 'Relatórios', route: '/employee/reports' },
  ];

  toggleSidebar(): void {
    this.sidebarState.toggle();
  }
}
