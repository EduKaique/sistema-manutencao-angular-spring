package com.remont.back_end.repository;

import com.remont.back_end.model.Budget;
import com.remont.back_end.model.BudgetService; // Entidade de ligação
import com.remont.back_end.model.ServiceItem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BudgetServiceRepository extends JpaRepository<BudgetService, Long> {

    List<BudgetService> findByBudget_Id(Long budgetId);

    List<BudgetService> findByServiceItem_Id(Long serviceItemId);

    boolean existsByBudgetAndServiceItem(Budget budget, ServiceItem serviceItem);

    void deleteByBudgetAndServiceItem(Budget budget, ServiceItem serviceItem);

    void deleteByBudget_Id(Long budgetId);
}