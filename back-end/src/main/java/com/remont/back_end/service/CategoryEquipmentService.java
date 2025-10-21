package com.remont.back_end.service;

import com.remont.back_end.dto.CategoryEquipmentDTO;
import com.remont.back_end.model.CategoryEquipment;
import com.remont.back_end.repository.CategoryEquipmentRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryEquipmentService {
    
    private final CategoryEquipmentRepository categoryEquipmentRepository;

    public CategoryEquipmentService(CategoryEquipmentRepository categoryEquipmentRepository) {
        this.categoryEquipmentRepository = categoryEquipmentRepository;
    }

    public List<CategoryEquipment> getAllCategories() {
        return categoryEquipmentRepository.findAll();
    }

    public Optional<CategoryEquipment> getCategoryById(Integer id) {
        return categoryEquipmentRepository.findById(id);
    }

    public CategoryEquipment saveCategory(CategoryEquipment categoryEquipment) {
        return categoryEquipmentRepository.save(categoryEquipment);
    }

    public CategoryEquipment updateCategory(Integer id, CategoryEquipmentDTO categoryDTO) {
        CategoryEquipment existingCategory = categoryEquipmentRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Categoria com id " + id + " não foi encontrada."));
        
        existingCategory.setName(categoryDTO.getName());
        existingCategory.setIcon(categoryDTO.getIcon());
        
        return categoryEquipmentRepository.save(existingCategory);
    }

    public void deleteCategory(Integer id) {
        categoryEquipmentRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Categoria com id " + id + " não foi encontrada."));
        categoryEquipmentRepository.deleteById(id);
    }
}