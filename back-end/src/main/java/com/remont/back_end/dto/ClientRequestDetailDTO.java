package com.remont.back_end.dto;

import com.remont.back_end.model.MaintenanceRequest;
import com.remont.back_end.model.StatusEnum;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class ClientRequestDetailDTO {
    private Long id;
    private String equipmentName;
    private String defectDescription;
    private LocalDateTime requestDate;
    private StatusEnum status;
    private String categoryName;
    private String rejectionReason;

    private List<BudgetDTO> budgets; 
    private List<RequestHistoryDTO> history; 

    public static ClientRequestDetailDTO fromEntity(MaintenanceRequest r, List<RequestHistoryDTO> historyList) {
        ClientRequestDetailDTO dto = new ClientRequestDetailDTO();
        dto.setId(r.getId());
        dto.setEquipmentName(r.getEquipmentName());
        dto.setDefectDescription(r.getDefectDescription());
        dto.setRequestDate(r.getRequestDate());
        dto.setStatus(r.getStatus());
        dto.setCategoryName(r.getCategory().getName());
        dto.setRejectionReason(r.getRejectionReason());
        
        if (r.getBudgets() != null) {
            dto.setBudgets(r.getBudgets().stream()
                .map(BudgetDTO::fromEntity)
                .collect(Collectors.toList()));
        }
        
        dto.setHistory(historyList);
        return dto;
    }
}