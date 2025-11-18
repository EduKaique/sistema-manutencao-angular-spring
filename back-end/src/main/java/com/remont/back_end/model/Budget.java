package com.remont.back_end.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "budgets")
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // FK para solicitação (mantido como ID simples)
    @Column(nullable = false)
    private Long requestId;

    // FK para empregado (opcional)
    @Column
    private Long employeeId;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal total;

    // Texto legível dos serviços inclusos (opcional, pode manter por compatibilidade)
    @Column(nullable = false, length = 2000)
    private String services;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // RELACIONAMENTO 1..n para itens de serviço do orçamento
    @OneToMany(mappedBy = "budget", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BudgetService> items = new ArrayList<>();

    // getters e setters básicos
    public Long getId() { return id; }
    public Long getRequestId() { return requestId; }
    public void setRequestId(Long requestId) { this.requestId = requestId; }
    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }
    public String getServices() { return services; }
    public void setServices(String services) { this.services = services; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public List<BudgetService> getItems() { return items; }
    public void setItems(List<BudgetService> items) { this.items = items; }

    // Helpers (opcionais) para gerenciar a associação em memória
    public void addServiceItem(BudgetService item) {
        items.add(item);
        item.setBudget(this);
    }

    public void removeServiceItem(BudgetService item) {
        items.remove(item);
        item.setBudget(null);
    }
}