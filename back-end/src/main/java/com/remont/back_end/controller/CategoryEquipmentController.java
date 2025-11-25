package com.remont.back_end.controller;

import com.remont.back_end.dto.CategoryEquipmentDTO;
import com.remont.back_end.model.CategoryEquipment;
import com.remont.back_end.service.CategoryEquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

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
        List<CategoryEquipmentDTO> categories = categoryEquipmentService.getAllCategories().stream()
                .map(cat -> new CategoryEquipmentDTO(cat.getId(), cat.getName(), cat.getIcon()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryEquipmentDTO> getCategoryById(@PathVariable Integer id) {
        return categoryEquipmentService.getCategoryById(id)
                .map(cat -> ResponseEntity.ok(new CategoryEquipmentDTO(cat.getId(), cat.getName(), cat.getIcon())))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CategoryEquipmentDTO> createCategory(
            @RequestBody CategoryEquipmentDTO categoryDTO, UriComponentsBuilder uriBuilder) {

        CategoryEquipment category = new CategoryEquipment(categoryDTO.getName(), categoryDTO.getIcon());
        CategoryEquipment savedCategory = categoryEquipmentService.saveCategory(category);

        URI uri = uriBuilder.path("/api/categories/{id}")
                .buildAndExpand(savedCategory.getId()).toUri();

        CategoryEquipmentDTO responseDTO = new CategoryEquipmentDTO(savedCategory.getId(), savedCategory.getName(), savedCategory.getIcon());

        return ResponseEntity.created(uri).body(responseDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryEquipmentDTO> updateCategory(@PathVariable Integer id, @RequestBody CategoryEquipmentDTO categoryDTO) {

        CategoryEquipment updatedCategory = categoryEquipmentService.updateCategory(id, categoryDTO);

        CategoryEquipmentDTO updatedDTO = new CategoryEquipmentDTO(updatedCategory.getId(), updatedCategory.getName(), updatedCategory.getIcon());

        return ResponseEntity.ok(updatedDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Integer id) {
        categoryEquipmentService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}