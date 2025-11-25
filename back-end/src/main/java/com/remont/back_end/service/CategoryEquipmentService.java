package com.remont.back_end.service;

import com.remont.back_end.dto.CategoryEquipmentDTO;
import java.util.List;

public interface CategoryEquipmentService {

    List<CategoryEquipmentDTO> getAllCategories();

    CategoryEquipmentDTO getCategoryById(Integer id);

    CategoryEquipmentDTO createCategory(CategoryEquipmentDTO categoryEquipment);

    CategoryEquipmentDTO updateCategory(Integer id, CategoryEquipmentDTO categoryDTO);

    void deleteCategory(Integer id);
}