import { MaintenanceServices } from '../../features/client/models/maintenance-services';

export const MAINTENANCE_SERVICES_MOCK: MaintenanceServices[] = [
  {
    id: 1,
    equipamento: 'Asus Laptop',
    categoria: 'Notebook',
    descricaoDefeito: 'Queimou se pá',
    status: 'Aberta',
  },
  {
    id: 2,
    equipamento: 'Celular Lixo 1MB',
    categoria: 'Celulat',
    descricaoDefeito: 'Quebrou a tela',
    status: 'ORÇADA',
  },
];
