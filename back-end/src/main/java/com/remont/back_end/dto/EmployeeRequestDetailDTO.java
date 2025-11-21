package com.remont.back_end.dto;

import com.remont.back_end.model.MaintenanceRequest;
import com.remont.back_end.model.StatusEnum;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class EmployeeRequestDetailDTO {
    private Long id;
    private String equipmentName;
    private String defectDescription;
    private LocalDateTime requestDate;
    private StatusEnum status;
    private String categoryName;

    private ClientDTO client; 
    private String assignedEmployeeName; 

    private List<BudgetDTO> budgets; 
    private MaintenanceRecordDTO maintenanceRecord;

    public static EmployeeRequestDetailDTO fromEntity(MaintenanceRequest r) {
        EmployeeRequestDetailDTO dto = new EmployeeRequestDetailDTO();
        dto.setId(r.getId());
        dto.setEquipmentName(r.getEquipmentName());
        dto.setDefectDescription(r.getDefectDescription());
        dto.setRequestDate(r.getRequestDate());
        dto.setStatus(r.getStatus());
        dto.setCategoryName(r.getCategory().getName());
        
        if (r.getClient() != null) {
            dto.setClient(ClientDTO.fromEntity(r.getClient())); 
        }

        if (r.getAssignedEmployee() != null) {
            dto.setAssignedEmployeeName(r.getAssignedEmployee().getName());
        }

        if (r.getBudgets() != null) {
            dto.setBudgets(r.getBudgets().stream()
                .map(BudgetDTO::fromEntity)
                .collect(Collectors.toList()));
        }

        if (r.getMaintenanceRecord() != null) {
            dto.setMaintenanceRecord(MaintenanceRecordDTO.fromEntity(r.getMaintenanceRecord()));
        }

        return dto;
    }
}