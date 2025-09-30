export interface RequestData {
  id: number;
  equipmentName: string;
  equipmentDescription: string;
  requestDate: Date;
  statusId: number;
  categoryId: number;
  clientId: number;
  employeeId: number;
  valor: number;
  status: 'APROVADA' | 'REJEITADA' | string;
  prazo?: string; 
  servicos?: string;
  rejectionReason?: string;
}