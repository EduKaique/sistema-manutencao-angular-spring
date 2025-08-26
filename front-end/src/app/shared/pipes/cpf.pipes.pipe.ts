import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfPipes'
})
export class CpfPipesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) return '';

    let cpf = String(value);

    cpf = cpf.replace(/\D/g,'');

    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');       
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 

     return cpf;
  }

}
