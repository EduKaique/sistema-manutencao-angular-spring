package com.remont.back_end.repository;

import com.remont.back_end.model.BudgetService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BudgetServiceRepository extends JpaRepository<BudgetService, Long> {

    // Buscar todos os serviços vinculados a um orçamento
    List<BudgetService> findByBudget_Id(Long budgetId);

    // Buscar todos os vínculos de um serviço (em quais orçamentos ele aparece)
    List<BudgetService> findByService_Id(Long serviceId);

    // Verificar se já existe o vínculo orçamento-serviço
    boolean existsByBudget_IdAndService_Id(Long budgetId, Long serviceId);

    // Remover um vínculo específico
    void deleteByBudget_IdAndService_Id(Long budgetId, Long serviceId);

    // Remover todos os vínculos de um orçamento
    void deleteByBudget_Id(Long budgetId);
}