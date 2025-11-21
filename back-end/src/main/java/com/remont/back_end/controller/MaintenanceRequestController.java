package com.remont.back_end.controller;

import com.remont.back_end.dto.BudgetDTO;
import com.remont.back_end.dto.MaintenanceRecordDTO;
import com.remont.back_end.dto.RejectionDTO;
import com.remont.back_end.security.UserPrincipal;
import com.remont.back_end.dto.MaintenanceRequestCreateDTO;
import com.remont.back_end.dto.MaintenanceRequestResponseDTO;
import com.remont.back_end.service.MaintenanceRequestService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class MaintenanceRequestController {

    @Autowired
    private MaintenanceRequestService maintenanceRequestService;

    @PostMapping
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<MaintenanceRequestResponseDTO> createRequest(
            @Valid @RequestBody MaintenanceRequestCreateDTO createDTO,
            Authentication authentication) {
        
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        MaintenanceRequestResponseDTO newRequest = maintenanceRequestService.createMaintenanceRequest(createDTO, userPrincipal.getId());
        return new ResponseEntity<>(newRequest, HttpStatus.CREATED);
    }

    @GetMapping("/client")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<List<MaintenanceRequestResponseDTO>> getClientRequests(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(maintenanceRequestService.getRequestsForClient(userPrincipal.getId()));
    }

    @GetMapping("/employee")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<List<MaintenanceRequestResponseDTO>> getEmployeeRequests(Authentication authentication) {
        return ResponseEntity.ok(maintenanceRequestService.getRequestsForEmployee(authentication.getName()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('CLIENT', 'EMPLOYEE')")
    public ResponseEntity<MaintenanceRequestResponseDTO> getRequestById(
            @PathVariable Long id, 
            Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(maintenanceRequestService.getRequestById(id, userPrincipal.getId()));
    }

    @PostMapping("/{id}/budget")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<MaintenanceRequestResponseDTO> setBudget(
            @PathVariable Long id, 
            @Valid @RequestBody BudgetDTO dto, 
            Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(maintenanceRequestService.createBudget(id, dto, userPrincipal.getId()));
    }

    @PostMapping("/{id}/approve")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<MaintenanceRequestResponseDTO> approveBudget(
            @PathVariable Long id, 
            Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(maintenanceRequestService.approveBudget(id, userPrincipal.getId()));
    }

    @PostMapping("/{id}/reject")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<MaintenanceRequestResponseDTO> rejectBudget(
            @PathVariable Long id, 
            @Valid @RequestBody RejectionDTO dto, 
            Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(maintenanceRequestService.rejectBudget(id, dto, userPrincipal.getId()));
    }

    @PostMapping("/{id}/rescue")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<MaintenanceRequestResponseDTO> rescueRequest(
            @PathVariable Long id, 
            Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(maintenanceRequestService.rescueRequest(id, userPrincipal.getId()));
    }

    @PostMapping("/{id}/maintenance")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<MaintenanceRequestResponseDTO> executeMaintenance(
            @PathVariable Long id, 
            @RequestBody MaintenanceRecordDTO dto, 
            Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(maintenanceRequestService.executeMaintenance(id, dto, userPrincipal.getId()));
    }

    @PostMapping("/{id}/redirect")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<MaintenanceRequestResponseDTO> redirectMaintenance(
            @PathVariable Long id, 
            @RequestParam Long targetEmployeeId, 
            Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(maintenanceRequestService.redirectMaintenance(id, targetEmployeeId, userPrincipal.getId()));
    }

    @PostMapping("/{id}/pay")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<MaintenanceRequestResponseDTO> payRequest(
            @PathVariable Long id, 
            Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(maintenanceRequestService.payRequest(id, userPrincipal.getId()));
    }

    @PostMapping("/{id}/finalize")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<MaintenanceRequestResponseDTO> finalizeRequest(
            @PathVariable Long id, 
            Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(maintenanceRequestService.finalizeRequest(id, userPrincipal.getId()));
    }
}