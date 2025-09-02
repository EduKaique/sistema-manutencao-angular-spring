import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { HeaderComponent } from '../../../core/layout/header/header.component';

@Component({
  selector: 'app-budget-delivery',
    imports: [MatCardModule, MatChipsModule, MatProgressBarModule, HeaderComponent],
  templateUrl: './budget-delivery.component.html',
  styleUrl: './budget-delivery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDeliveryComponent {
}