package com.remont.back_end.service;

import com.remont.back_end.dto.BudgetDTO;
import com.remont.back_end.model.Budget;
import com.remont.back_end.repository.BudgetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;

    public BudgetService(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    public List<Budget> findAll() {
        return budgetRepository.findAll();
    }

    public Optional<Budget> findById(Long id) {
        return budgetRepository.findById(id);
    }

    public List<Budget> findByRequestId(Long requestId) {
        return budgetRepository.findByRequestId(requestId);
    }

    public Budget create(BudgetDTO dto) {
        Budget b = new Budget();
        b.setRequestId(dto.getRequestId());
        b.setEmployeeId(dto.getEmployeeId());
        b.setTotal(dto.getTotal());
        b.setServices(dto.getServices());
        return budgetRepository.save(b);
    }

    public Budget update(Long id, BudgetDTO dto) {
        Budget b = budgetRepository.findById(id)
                .orElseThrow();

        // Atualiza apenas campos presentes no DTO (permite atualização parcial)
        if (dto.getRequestId() != null) {
            b.setRequestId(dto.getRequestId());
        }
        if (dto.getEmployeeId() != null) {
            b.setEmployeeId(dto.getEmployeeId());
        }
        if (dto.getTotal() != null) {
            b.setTotal(dto.getTotal());
        }
        if (dto.getServices() != null) {
            b.setServices(dto.getServices());
        }

        return budgetRepository.save(b);
    }

    public void delete(Long id) {
        budgetRepository.deleteById(id);
    }
}
