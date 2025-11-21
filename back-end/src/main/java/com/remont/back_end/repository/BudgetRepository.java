package com.remont.back_end.repository;

import com.remont.back_end.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByMaintenanceRequest_Id(Long requestId);
}