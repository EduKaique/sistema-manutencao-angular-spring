package com.remont.back_end.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.remont.back_end.model.Budget;
import com.remont.back_end.repository.BudgetRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/budgets/")
public class BudgetController {
    private final BudgetRepository BudgetRepository = null;

    // get all budgets
    @GetMapping
    public List<com.remont.back_end.model.Budget> getAllBudgets() {
        return BudgetRepository.findAll();
    };
    
    //post mapping to create a budget
    @PostMapping
    public Budget createBudget(@RequestBody String budget) {
        
        return BudgetRepository.save(budget);
    }
    
}
