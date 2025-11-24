export interface MaintenanceRequestCreateDTO {
  equipmentName: string;
  defectDescription: string;
  categoryId: number; 
}

export interface MaintenanceRequestResponseDTO {
  id: number;
  equipmentName: string;
  defectDescription: string;
  requestDate: string; 
  statusName: string;  
  statusColor: string; 
  categoryName: string;
  clientName: string;
}