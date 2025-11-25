package com.remont.back_end.dto;

import com.remont.back_end.model.CategoryEquipment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryEquipmentDTO {
    private Integer id;
    private String name;
    private String icon;
    private boolean active;

    // Método auxiliar estático (opcional, mas útil)
    public static CategoryEquipmentDTO fromEntity(CategoryEquipment category) {
        return new CategoryEquipmentDTO(
            category.getId(), 
            category.getName(), 
            category.getIcon(), 
            category.isActive()
        );
    }
}