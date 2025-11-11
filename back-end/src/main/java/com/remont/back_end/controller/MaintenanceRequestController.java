package com.remont.back_end.controller;

import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import com.remont.back_end.model.MaintenanceRequest;
import com.remont.back_end.service.MaintenanceRequestServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance-requests")
@CrossOrigin(origins = "http://localhost:4200")
public class MaintenanceRequestController {

    private final MaintenanceRequestServiceImpl maintenanceRequestService;

    public MaintenanceRequestController(MaintenanceRequestServiceImpl maintenanceRequestService) {
        this.maintenanceRequestService = maintenanceRequestService;
    }

    @GetMapping
    public List<MaintenanceRequest> getAll() {
        return maintenanceRequestService.getAllRequests();
    }

    @GetMapping("/{id}")
    public MaintenanceRequest getById(@PathVariable Long id) {
        return maintenanceRequestService.getRequestById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "MaintenanceRequest não encontrado: " + id));
    }

    @PostMapping
    public MaintenanceRequest create(@RequestBody MaintenanceRequest maintenanceRequest) {
        return maintenanceRequestService.createRequest(maintenanceRequest);
    }

    @PutMapping("/{id}")
    public MaintenanceRequest update(@PathVariable Long id, @RequestBody MaintenanceRequest maintenanceRequest) {
        return maintenanceRequestService.updateRequest(id, maintenanceRequest);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        maintenanceRequestService.deleteRequest(id);
    }
}