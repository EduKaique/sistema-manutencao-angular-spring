package com.remont.back_end.dto;

import com.remont.back_end.model.Budget;
import com.remont.back_end.model.BudgetService; // Importante para o map
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetDTO {

    private Long id;
    
    private Long requestId; 
    
    private Long employeeId;  
    
    private BigDecimal total;
    
    private String services; 

    private List<Long> serviceIds; 
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static BudgetDTO fromEntity(Budget budget) {
        List<Long> extractedIds = null;
        if (budget.getItems() != null) {
            extractedIds = budget.getItems().stream()
                    .map(BudgetService::getServiceItem) 
                    .map(item -> item.getId())          
                    .collect(Collectors.toList());
        }

        return new BudgetDTO(
            budget.getId(),
            budget.getMaintenanceRequest().getId(), 
            budget.getEmployeeId(),
            budget.getTotal(),
            budget.getServicesDescription(),
            extractedIds,
            budget.getCreatedAt(),
            budget.getUpdatedAt()
        );
    }
}