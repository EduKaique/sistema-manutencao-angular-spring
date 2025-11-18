package com.remont.back_end.repository;

import com.remont.back_end.model.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    
    // (Futuramente, RF003 - Listar por cliente)
    // List<ServiceRequest> findByClientIdOrderByRequestDateAsc(Long clientId);
}