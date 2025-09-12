import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { HeaderComponent } from '../../../core/layout/header/header.component';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-budget-delivery',
    imports: [MatCardModule, MatChipsModule, MatProgressBarModule, HeaderComponent, SharedModule],
  templateUrl: './budget-delivery.component.html',
  styleUrl: './budget-delivery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDeliveryComponent {  
  
  @Input() tecnicoNome?: string;

  @Output() atribuirResponsavel = new EventEmitter<void>();

  onAtribuirResponsavel(): void {
    this.atribuirResponsavel.emit();
  }
}