package com.remont.back_end.service;

import java.util.List;
import com.remont.back_end.dto.BudgetDTO;
import com.remont.back_end.dto.MaintenanceRecordDTO;
import com.remont.back_end.dto.RejectionDTO;
import com.remont.back_end.dto.MaintenanceRequestCreateDTO;
import com.remont.back_end.dto.MaintenanceRequestResponseDTO;

public interface MaintenanceRequestService {

    MaintenanceRequestResponseDTO createMaintenanceRequest(MaintenanceRequestCreateDTO createDTO, Long clientId);

    List<MaintenanceRequestResponseDTO> getRequestsForClient(Long clientId);

    List<MaintenanceRequestResponseDTO> getRequestsForEmployee(String employeeEmail);

    MaintenanceRequestResponseDTO getRequestById(Long id, Long userId);

    MaintenanceRequestResponseDTO createBudget(Long requestId, BudgetDTO dto, Long employeeId);

    MaintenanceRequestResponseDTO approveBudget(Long requestId, Long clientId);

    MaintenanceRequestResponseDTO rejectBudget(Long requestId, RejectionDTO dto, Long clientId);

    MaintenanceRequestResponseDTO rescueRequest(Long requestId, Long clientId);

    MaintenanceRequestResponseDTO executeMaintenance(Long requestId, MaintenanceRecordDTO dto, Long employeeId);

    MaintenanceRequestResponseDTO redirectMaintenance(Long requestId, Long targetEmployeeId, Long employeeId);

    MaintenanceRequestResponseDTO payRequest(Long requestId, Long clientId);

    MaintenanceRequestResponseDTO finalizeRequest(Long requestId, Long employeeId);
}