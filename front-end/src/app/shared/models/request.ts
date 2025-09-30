import { Client } from '../models/client'
import { Employee } from '../models/employee'
import { Category } from '../models/category'
import { Status } from '../models/status'

export interface Request {
  id: number;
  equipmentName: string;
  equipmentDescription: string;
  requestDate: Date;
  category: string;
  //lastAtualization: Date;
  statusId: number;
  status?: 'APROVADA' | 'REJEITADA' | string;
  categoryId: number;
  clientId: number;
  employeeId: number;
  rejectionReason?: string;
}
