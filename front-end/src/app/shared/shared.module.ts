import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfPipesPipe } from './pipes/cpf.pipes.pipe';
import { HeaderComponent } from '../core/layout/header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    CpfPipesPipe
  ],
   exports: [HeaderComponent]
})
export class SharedModule { }
