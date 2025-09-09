export interface Request {
  id: number;
  nome_equipamento: string;
  descrição_equipamento: string;
  data_solicitação: Date;
  status_id: number; 
  categoria_id: number; 
  cliente_id: number; 
  funcionario_id?: number; 
}
