package com.remont.back_end.service;

import com.remont.back_end.dto.BudgetDTO;
import com.remont.back_end.model.Budget;
import java.util.List;
import java.util.Optional;

public interface BudgetService {
    
    List<Budget> findAll();

    Optional<Budget> findById(Long id);

    List<Budget> findByRequestId(Long requestId);

    Budget create(BudgetDTO dto);

    Budget update(Long id, BudgetDTO dto);

    void delete(Long id);
}