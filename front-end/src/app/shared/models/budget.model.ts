export interface Budget {
  id: number;
  requestId: number;
  employeeId: number;
  total: number;          
  services: string;
  serviceIds: number[];   
  createdAt: string;     
  updatedAt: string;      
}
