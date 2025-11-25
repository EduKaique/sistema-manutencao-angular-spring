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

    @PostMapping
    public MaintenanceRecord create(@RequestBody MaintenanceRecord MaintenanceRecord) {
        return maintenanceRecordService.createRecord(MaintenanceRecord);
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