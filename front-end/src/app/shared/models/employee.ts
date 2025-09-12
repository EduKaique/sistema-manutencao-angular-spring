import { User } from './user';

export enum Cargo {
  TecnicoEmEletronica = 'Técnico em Eletrônica',
  TecnicoEmInformatica = 'Técnico em Informática',
  Instalador = 'Instalador',
  AuxiliarTecnico = 'Auxiliar Técnico',
}

export interface Employee extends User {
  cargo: Cargo;
  salario: number;
  dataNascimento: Date;
}
