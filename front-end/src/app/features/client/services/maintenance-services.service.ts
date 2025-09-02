import { Injectable } from '@angular/core';
import { MaintenanceServices } from '../models/maintenance-services';
import { StorageService } from '../../../core/services/storage.service';
import { MAINTENANCE_SERVICES_MOCK } from '../../../shared/mocks/maintenance-service';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceServicesService {
  private readonly storageKey = 'maintenanceServices';

  constructor(private storage: StorageService) {
    if (!this.storage.get<MaintenanceServices[]>(this.storageKey)) {
      this.storage.set(this.storageKey, MAINTENANCE_SERVICES_MOCK);
    }
  }

  getAll(): MaintenanceServices[] {
    return this.storage.get<MaintenanceServices[]>(this.storageKey) ?? [];
  }

  getById(id: number): MaintenanceServices | undefined {
    return this.getAll().find((f) => f.id === id);
  }

  add(fornecedor: MaintenanceServices): void {
    const maintenanceServices = this.getAll();
    fornecedor.id = Date.now();
    maintenanceServices.push(fornecedor);
    this.storage.set(this.storageKey, maintenanceServices);
  }

  update(fornecedor: MaintenanceServices): void {
    let maintenanceServices = this.getAll();
    maintenanceServices = maintenanceServices.map((f) =>
      f.id === fornecedor.id ? fornecedor : f
    );
    this.storage.set(this.storageKey, maintenanceServices);
  }

  delete(id: number): void {
    const maintenanceServices = this.getAll().filter((f) => f.id !== id);
    this.storage.set(this.storageKey, maintenanceServices);
  }
}
