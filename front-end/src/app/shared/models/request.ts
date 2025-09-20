export interface Request {
  id: number;
  title: string;
  equipmentName: string;
  equipmentDescription: string;
  requestDate: Date;
  category: string;
  //lastAtualization: Date;
  statusId: number;
  categoryId: number;
  clientId: number;
  employeeId: number;
}
