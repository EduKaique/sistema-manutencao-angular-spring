package com.remont.back_end.repository;

import com.remont.back_end.model.BudgetService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BudgetServiceRepository extends JpaRepository<BudgetService, Long> {
    
    //  Buscar todos os serviços de um orçamento específico
    List<BudgetService> findByOrcamentoId(Long orcamentoId);

    //  Buscar todos os orçamentos que contêm um serviço específico
    List<BudgetService> findByServicoId(Long servicoId);
    
    //  Verificar se existe um relacionamento específico
    boolean existsByOrcamentoIdAndServicoId(Long orcamentoId, Long servicoId);
    
    //  Deletar um relacionamento específico
    void deleteByOrcamentoIdAndServicoId(Long orcamentoId, Long servicoId);
    
    //  Deletar todos os serviços de um orçamento
    void deleteByOrcamentoId(Long orcamentoId);
}
