package com.remont.back_end.service;

import com.remont.back_end.dto.CategoryEquipmentDTO;
import com.remont.back_end.model.CategoryEquipment;
import com.remont.back_end.repository.CategoryEquipmentRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CategoryEquipmentServiceImpl implements CategoryEquipmentService{
    
    private final CategoryEquipmentRepository categoryEquipmentRepository;

    public CategoryEquipmentServiceImpl(CategoryEquipmentRepository categoryEquipmentRepository) {
        this.categoryEquipmentRepository = categoryEquipmentRepository;
    }

    @Override
    public List<CategoryEquipment> getAllCategories() {
        return categoryEquipmentRepository.findAll();
    }

    @Override
    public Optional<CategoryEquipment> getCategoryById(Integer id) {
        return categoryEquipmentRepository.findById(Objects.requireNonNull(id));
    }

    @Override
    public CategoryEquipment saveCategory(CategoryEquipment categoryEquipment) {
        return categoryEquipmentRepository.save(Objects.requireNonNull(categoryEquipment));
    }

    @Override
    public CategoryEquipment updateCategory(Integer id, CategoryEquipmentDTO categoryDTO) {
        CategoryEquipment existingCategory = categoryEquipmentRepository.findById(Objects.requireNonNull(id))
            .orElseThrow(() -> new IllegalArgumentException("Categoria com id " + id + " não foi encontrada."));
        
        existingCategory.setName(categoryDTO.getName());
        existingCategory.setIcon(categoryDTO.getIcon());
        
        return categoryEquipmentRepository.save(existingCategory);
    }

    @Override
    public void deleteCategory(Integer id) {
        if (!categoryEquipmentRepository.existsById(Objects.requireNonNull(id))) {
            throw new IllegalArgumentException("Categoria com id " + id + " não encontrada.");
        }
        categoryEquipmentRepository.deleteById(id);
    }
}