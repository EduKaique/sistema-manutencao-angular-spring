package com.remont.back_end.service;

import com.remont.back_end.model.MaintenanceRequest;
import java.util.List;
import java.util.Optional;

public interface MaintenanceRequestService {

    List<MaintenanceRequest> getAllRequests();

    Optional<MaintenanceRequest> getRequestById(Long id);

    MaintenanceRequest createRequest(MaintenanceRequest maintenanceRequest);

    MaintenanceRequest updateRequest(Long id, MaintenanceRequest maintenanceRequest);

    void deleteRequest(Long id);

}