package com.remont.back_end.controller;

import org.springframework.web.server.ResponseStatusException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import com.remont.back_end.model.MaintenanceRecord;
import com.remont.back_end.service.MaintenanceRecordService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance-records")
@CrossOrigin(origins = "http://localhost:4200")
public class MaintenanceRecordController {

    private final MaintenanceRecordService maintenanceRecordService;

    @Autowired
    public MaintenanceRecordController(MaintenanceRecordService maintenanceRecordService) {
        this.maintenanceRecordService = maintenanceRecordService;
    }

    @GetMapping
    public List<MaintenanceRecord> getAll() {
        return maintenanceRecordService.getAllRecords();
    }

    @GetMapping("/{id}")
    public MaintenanceRecord getById(@PathVariable Long id) {
        return maintenanceRecordService.getRecordById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "MaintenanceRecord não encontrado: " + id));
    }

    @GetMapping("/by-request/{requestId}")
    public MaintenanceRecord getByRequestId(@PathVariable Long requestId) {
        return maintenanceRecordService.getRecordByRequestId(requestId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "MaintenanceRecord não encontrado para request: " + requestId));
    }

    @PostMapping("/{requestId}")
    public MaintenanceRecord create(@PathVariable Long requestId, 
    @RequestBody MaintenanceRecord record) {
    return maintenanceRecordService.createRecord(record, requestId);
}

    @PutMapping("/{id}")
    public MaintenanceRecord update(@PathVariable Long id, @RequestBody MaintenanceRecord MaintenanceRecord) {
        return maintenanceRecordService.updateRecord(id, MaintenanceRecord);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        maintenanceRecordService.deleteRecord(id);
    }
}