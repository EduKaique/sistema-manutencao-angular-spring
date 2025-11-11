package com.remont.back_end.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

/**
 * Tabela intermediária para relacionamento muitos-para-muitos
 * entre Orçamentos e Serviços
 */
@Entity
@Table(name = "servicos_orcamento")
public class BudgetService {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull(message = "O ID do serviço é obrigatório")
    @Column(name = "servico_id", nullable = false)
    private Long servicoId;
    
    @NotNull(message = "O ID do orçamento é obrigatório")
    @Column(name = "orcamento_id", nullable = false)
    private Long orcamentoId;

    // Construtores
    public BudgetService() {}
    
    public BudgetService(Long servicoId, Long orcamentoId) {
        this.servicoId = servicoId;
        this.orcamentoId = orcamentoId;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getServicoId() {
        return servicoId;
    }

    public void setServicoId(Long servicoId) {
        this.servicoId = servicoId;
    }

    public Long getOrcamentoId() {
        return orcamentoId;
    }

    public void setOrcamentoId(Long orcamentoId) {
        this.orcamentoId = orcamentoId;
    }
}
