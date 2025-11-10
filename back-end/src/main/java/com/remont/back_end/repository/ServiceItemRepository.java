package com.remont.back_end.repository;

import com.remont.back_end.model.ServiceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceItemRepository extends JpaRepository<ServiceItem, Long> {
    boolean existsByNomeIgnoreCase(String nome);
}