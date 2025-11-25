package com.remont.back_end.service;

import com.remont.back_end.dto.CategoryEquipmentDTO;
import com.remont.back_end.exception.ResourceNotFoundException;
import com.remont.back_end.model.CategoryEquipment;
import com.remont.back_end.repository.CategoryEquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CategoryEquipmentServiceImpl implements CategoryEquipmentService {

    @Autowired
    private CategoryEquipmentRepository categoryEquipmentRepository;


    @Override
    @Transactional(readOnly = true)
    public List<CategoryEquipmentDTO> getAllCategories() {
        return categoryEquipmentRepository.findAllByActiveTrue().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryEquipmentDTO getCategoryById(Integer id) {
        CategoryEquipment category = categoryEquipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada id: " + id));
        return convertToDTO(category);
    }


    @Override
    @Transactional
    public CategoryEquipmentDTO createCategory(CategoryEquipmentDTO dto) {
        CategoryEquipment category = new CategoryEquipment();
        category.setName(dto.getName());
        category.setIcon(dto.getIcon());
        category.setActive(true); 

        CategoryEquipment saved = categoryEquipmentRepository.save(category);
        return convertToDTO(saved);
    }

    @Override
    @Transactional
    public CategoryEquipmentDTO updateCategory(Integer id, CategoryEquipmentDTO dto) {
        CategoryEquipment category = categoryEquipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada id: " + id));

        category.setName(dto.getName());
        category.setIcon(dto.getIcon());
        

        CategoryEquipment updated = categoryEquipmentRepository.save(category);
        return convertToDTO(updated);
    }

    @Override
    @Transactional
    public void deleteCategory(Integer id) {
        CategoryEquipment category = categoryEquipmentRepository.findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new IllegalArgumentException("Categoria com id " + id + " não encontrada."));

        category.setActive(false); 
        categoryEquipmentRepository.save(category);
    }


    private CategoryEquipmentDTO convertToDTO(CategoryEquipment category) {
        return CategoryEquipmentDTO.fromEntity(category);
    }
}