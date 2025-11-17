package com.remont.back_end.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.remont.back_end.model.CategoryEquipment;

@Repository
public interface CategoryEquipmentRepository extends JpaRepository<CategoryEquipment, Integer> {
    
    Optional<CategoryEquipment> findById(Integer id);
}