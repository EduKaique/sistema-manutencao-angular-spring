package com.remont.back_end.controller;

import com.remont.back_end.dto.CategoryEquipmentDTO;
import com.remont.back_end.service.CategoryEquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryEquipmentController {

    private final CategoryEquipmentService categoryEquipmentService;

    @Autowired
    public CategoryEquipmentController(CategoryEquipmentService categoryEquipmentService) {
        this.categoryEquipmentService = categoryEquipmentService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryEquipmentDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryEquipmentService.getAllCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryEquipmentDTO> getCategoryById(@PathVariable Integer id) {
        CategoryEquipmentDTO category = categoryEquipmentService.getCategoryById(id);
        
        return ResponseEntity.ok(category);
    }

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<CategoryEquipmentDTO> createCategory(
            @RequestBody CategoryEquipmentDTO categoryDTO, 
            UriComponentsBuilder uriBuilder) {

        CategoryEquipmentDTO savedCategory = categoryEquipmentService.createCategory(categoryDTO);

        URI uri = uriBuilder.path("/api/categories/{id}")
                .buildAndExpand(savedCategory.getId()).toUri();

        return ResponseEntity.created(uri).body(savedCategory);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<CategoryEquipmentDTO> updateCategory(
            @PathVariable Integer id, 
            @RequestBody CategoryEquipmentDTO categoryDTO) {

        return ResponseEntity.ok(categoryEquipmentService.updateCategory(id, categoryDTO));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<Void> deleteCategory(@PathVariable Integer id) {
        categoryEquipmentService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}