package com.remont.back_end.dto;

import com.remont.back_end.model.Budget;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BudgetDTO {
    private Long id;
    private Long requestId;
    private Long employeeId;
    private BigDecimal total;
    private String services;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public BudgetDTO() {}

    public BudgetDTO(Long id, Long requestId, Long employeeId, BigDecimal total, String services,
                     LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.requestId = requestId;
        this.employeeId = employeeId;
        this.total = total;
        this.services = services;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static BudgetDTO fromEntity(Budget b) {
        return new BudgetDTO(
            b.getId(),
            b.getRequestId(),
            b.getEmployeeId(),
            b.getTotal(),
            b.getServices(),
            b.getCreatedAt(),
            b.getUpdatedAt()
        );
    }

    // getters e setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getRequestId() { return requestId; }
    public void setRequestId(Long requestId) { this.requestId = requestId; }

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }

    public String getServices() { return services; }
    public void setServices(String services) { this.services = services; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}