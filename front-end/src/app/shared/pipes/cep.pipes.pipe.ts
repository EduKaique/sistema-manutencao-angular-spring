import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cepPipes'
})
export class CepPipesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
