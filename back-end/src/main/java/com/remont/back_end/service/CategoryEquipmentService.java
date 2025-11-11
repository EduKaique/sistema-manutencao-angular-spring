package com.remont.back_end.service;

import com.remont.back_end.dto.CategoryEquipmentDTO;
import com.remont.back_end.model.CategoryEquipment;
import java.util.List;
import java.util.Optional;

public interface CategoryEquipmentService {

    List<CategoryEquipment> getAllCategories();

    Optional<CategoryEquipment> getCategoryById(Integer id);

    CategoryEquipment saveCategory(CategoryEquipment categoryEquipment);

    CategoryEquipment updateCategory(Integer id, CategoryEquipmentDTO categoryDTO);

    void deleteCategory(Integer id);
}