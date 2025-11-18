package com.remont.back_end.dto;

import com.remont.back_end.model.Budget;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetDTO {

    private Long id;
    private Long requestId;   
    private Long employeeId;  
    private BigDecimal total;
    private String services;  
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    public static BudgetDTO fromEntity(Budget budget) {
        return new BudgetDTO(
            budget.getId(),
            budget.getRequestId(),
            budget.getEmployeeId(),
            budget.getTotal(),
            budget.getServicesDescription(),
            budget.getCreatedAt(),
            budget.getUpdatedAt()
        );
    }
}