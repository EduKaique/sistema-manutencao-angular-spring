package com.remont.back_end.dto;

import jakarta.validation.constraints.NotNull;

//  DTO para a tabela intermediária servicos_orcamento

public class BudgetServiceDTO {
    
    private Long id;
    
    @NotNull(message = "O ID do serviço é obrigatório")
    private Long servicoId;
    
    @NotNull(message = "O ID do orçamento é obrigatório")
    private Long orcamentoId;

    // Construtores
    public BudgetServiceDTO() {}
    
    public BudgetServiceDTO(Long id, Long servicoId, Long orcamentoId) {
        this.id = id;
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
