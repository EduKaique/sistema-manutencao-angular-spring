import { Estado } from '../models/address';
import { Client } from '../models/client';
import { Employee, Role } from '../models/employee';

export const CLIENT_MOCKS: Client[] = [
  {
    id: 2,
    name: 'Nilton Nativas',
    email: 'cliente@email.com',
    cpf: '000.000.000-00',
    phoneNumber: '(00) 0 0000-0000',
    password: '1234',
    userAccess: 'client',
    clientid: 1,
    address: {
      id: 1,
      cep: '12345-000',
      logradouro: 'Rua dos Clientes, 123',
      bairro: 'Centro',
      cidade: 'Cidade Exemplo',
      estado: Estado.PR,
    },
  },
];

export const EMPLOYEE_MOCKS: Employee[] = [
  {
    id: 105,
    name: 'Funcionário da Silva',
    email: 'funcionario@email.com',
    cpf: '111.111.111-11',
    phoneNumber: '(11) 1 1111-1111',
    password: '4321',
    userAccess: 'employee',
    employeeId: 42,
    role: Role.TecnicoEmInformatica,
    salary: 4500,
    birthDate: new Date('1990-05-15'),
  },
  {
    id: 1,
    name: 'Admin',
    email: 'admin@email.com',
    cpf: '222.222.222-22',
    phoneNumber: '(99) 9 9999-9999',
    password: '9876',
    userAccess: 'employee',
    employeeId: 1,
    role: Role.TecnicoEmEletronica,
    salary: 7000,
    birthDate: new Date('1985-10-20'),
  },
];

