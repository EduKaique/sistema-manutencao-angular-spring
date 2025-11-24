package com.remont.back_end.repository;

import com.remont.back_end.model.Budget;
import com.remont.back_end.model.ServiceBudget; // Entidade de ligação
import com.remont.back_end.model.ServiceItem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceBudgetRepository extends JpaRepository<ServiceBudget, Long> {

    List<ServiceBudget> findByBudget_Id(Long budgetId);

    List<ServiceBudget> findByServiceItem_Id(Long serviceItemId);

    boolean existsByBudgetAndServiceItem(Budget budget, ServiceItem serviceItem);

    void deleteByBudgetAndServiceItem(Budget budget, ServiceItem serviceItem);

    void deleteByBudget_Id(Long budgetId);
}