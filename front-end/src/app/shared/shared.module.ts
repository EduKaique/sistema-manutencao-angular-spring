import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfPipesPipe } from './pipes/cpf.pipes.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../core/layout/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CpfPipesPipe,
    HeaderComponent 
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    CpfPipesPipe,
    HeaderComponent
  ]
})
export class SharedModule { }