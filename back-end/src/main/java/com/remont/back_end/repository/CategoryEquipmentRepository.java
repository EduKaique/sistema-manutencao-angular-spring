package com.remont.back_end.repository;

import com.remont.back_end.entity.CategoryEquipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryEquipmentRepository extends JpaRepository<CategoryEquipment, Integer> {
    
}