import { Budget } from "./budget.model";
import { Client } from "./client";
import { MaintenanceRecordDTO } from "./maintenance-record.model";
import { RequestHistory } from "./request-history";
import { Status } from "./status";

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

export interface ClientRequestDetailDTO {
  id: number;
  equipmentName: string;
  defectDescription: string;
  requestDate: string; 
  status: Status; 
  categoryName: string;
  rejectionReason?: string; 

  budgets: Budget[];
  history: RequestHistory[];
}


export interface EmployeeRequestDetailDTO {
  id: number;
  equipmentName: string;
  defectDescription: string;
  requestDate: string;
  status: Status;
  categoryName: string;

  client: Client;
  assignedEmployeeName?: string;

  budgets: Budget[];
  maintenanceRecord?: MaintenanceRecordDTO; 
}

export interface RejectionDTO {
  rejectionReason: string;
}