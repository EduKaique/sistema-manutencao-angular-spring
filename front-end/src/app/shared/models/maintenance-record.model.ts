export interface MaintenanceRecordDTO {
  id: number;
  maintenanceDescription: string;
  clientGuidelines: string;
  finishedAt?: string;
}