export interface MaintenanceRecord {
  id?: number;
  maintenanceDescription: string;
  clientGuidelines: string;
  finishedAt?: string;
  employeeId?: number;
  maintenanceRequestId: number;
}
