package com.remont.back_end.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore; // Importante para evitar loop infinito no JSON

@Entity
@Table(name = "servicos_orcamento")
public class BudgetService {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "servico_id", nullable = false)
    private ServiceItem serviceItem;
    
    @ManyToOne
    @JoinColumn(name = "orcamento_id", nullable = false)
    @JsonIgnore 
    private Budget budget;

    public BudgetService() {}
    
    public BudgetService(ServiceItem serviceItem, Budget budget) {
        this.serviceItem = serviceItem;
        this.budget = budget;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public ServiceItem getServiceItem() { return serviceItem; }
    public void setServiceItem(ServiceItem serviceItem) { this.serviceItem = serviceItem; }

    public Budget getBudget() { return budget; }
    public void setBudget(Budget budget) { this.budget = budget; }
}