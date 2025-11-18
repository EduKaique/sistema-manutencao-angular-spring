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

    @Column(nullable = false)
    private Long requestId; // FK para solicitação

    @Column
    private Long employeeId; // FK para empregado

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal total;

    @Column(length = 2000) // Pode ser null se você já tem a lista de itens
    private String servicesDescription; 

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() { this.createdAt = LocalDateTime.now(); }

    @PreUpdate
    public void onUpdate() { this.updatedAt = LocalDateTime.now(); }

    // RELACIONAMENTO CORRIGIDO
    // 'mappedBy = "budget"' refere-se ao campo 'budget' na classe BudgetService
    @OneToMany(mappedBy = "budget", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BudgetService> items = new ArrayList<>();

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getRequestId() { return requestId; }
    public void setRequestId(Long requestId) { this.requestId = requestId; }
    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }
    public String getServicesDescription() { return servicesDescription; }
    public void setServicesDescription(String servicesDescription) { this.servicesDescription = servicesDescription; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public List<BudgetService> getItems() { return items; }
    public void setItems(List<BudgetService> items) { 
        this.items = items; 
        // Garante a consistência do relacionamento bidirecional
        if(items != null) {
            items.forEach(item -> item.setBudget(this));
        }
    }
    
    // Método auxiliar para adicionar itens facilmente
    public void addItem(BudgetService item) {
        items.add(item);
        item.setBudget(this);
    }
}