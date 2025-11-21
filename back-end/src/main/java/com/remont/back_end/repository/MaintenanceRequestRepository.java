package com.remont.back_end.repository;

import java.util.List;
import com.remont.back_end.model.Client;
import com.remont.back_end.model.MaintenanceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequest, Long> {
    
    List<MaintenanceRequest> findByClientOrderByRequestDateAsc(Client client);
    List<MaintenanceRequest> findAllByOrderByRequestDateAsc();
}