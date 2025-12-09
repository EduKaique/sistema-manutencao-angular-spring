package com.remont.back_end.controller;

import com.remont.back_end.dto.BudgetDTO;
import com.remont.back_end.model.Budget;
import com.remont.back_end.service.BudgetService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @GetMapping
    public ResponseEntity<List<BudgetDTO>> getAllBudgets() {
        List<BudgetDTO> budgets = budgetService.findAll().stream()
                .map(BudgetDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(budgets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BudgetDTO> getBudgetById(@PathVariable Long id) {
        return budgetService.findById(id)
                .map(b -> ResponseEntity.ok(BudgetDTO.fromEntity(b)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/by-request/{requestId}")
    public ResponseEntity<List<BudgetDTO>> getBudgetsByRequest(@PathVariable Long requestId) {
        List<BudgetDTO> budgets = budgetService.findByRequestId(requestId).stream()
                .map(BudgetDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(budgets);
    }

    @PostMapping
    public ResponseEntity<BudgetDTO> createBudget(@RequestBody BudgetDTO dto,
                                                  UriComponentsBuilder uriBuilder) {
        Budget saved = budgetService.create(dto);
        URI uri = uriBuilder.path("/api/budgets/{id}")
                .buildAndExpand(saved.getId()).toUri();
        return ResponseEntity.created(uri).body(BudgetDTO.fromEntity(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BudgetDTO> updateBudget(@PathVariable Long id,
                                                  @RequestBody BudgetDTO dto) {
        Budget updated = budgetService.update(id, dto);
        return ResponseEntity.ok(BudgetDTO.fromEntity(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBudget(@PathVariable Long id) {
        budgetService.delete(id);
        return ResponseEntity.noContent().build();
    }
}