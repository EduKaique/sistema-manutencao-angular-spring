package com.remont.back_end.controller;

import com.remont.back_end.dto.BudgetDTO;
import com.remont.back_end.dto.ClientRequestDetailDTO;
import com.remont.back_end.dto.EmployeeRequestDetailDTO;
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

    /**
     * Visualizar detalhes completos para CLIENTE.
     * Retorna: Request + Orçamentos + Histórico
     */
    @GetMapping("/client/{id}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<ClientRequestDetailDTO> getRequestForClient(
            @PathVariable Long id, 
            Authentication authentication) {
        
        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(
            maintenanceRequestService.getRequestDetailForClient(id, user.getId())
        );
    }

    /**
     * Visualizar detalhes completo para funcionário.
     * Retorna: Request + Cliente + Orçamentos + Manutenção
     */
    @GetMapping("/employee/{id}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<EmployeeRequestDetailDTO> getRequestForEmployee(
            @PathVariable Long id) {
        
        return ResponseEntity.ok(
            maintenanceRequestService.getRequestDetailForEmployee(id)
        );
    }

    @PostMapping("/employee/{id}/budget")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<MaintenanceRequestResponseDTO> setBudget(
            @PathVariable Long id, 
            @Valid @RequestBody BudgetDTO dto, 
            Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(maintenanceRequestService.createBudget(id, dto, userPrincipal.getId()));
    }

    @PostMapping("/client/{id}/approve")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<MaintenanceRequestResponseDTO> approveBudget(
            @PathVariable Long id, 
            Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(maintenanceRequestService.approveBudget(id, userPrincipal.getId()));
    }

    @PostMapping("/client/{id}/reject")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<MaintenanceRequestResponseDTO> rejectBudget(
            @PathVariable Long id, 
            @Valid @RequestBody RejectionDTO dto, 
            Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(maintenanceRequestService.rejectBudget(id, dto, userPrincipal.getId()));
    }

    @PostMapping("/client/{id}/rescue")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<MaintenanceRequestResponseDTO> rescueRequest(
            @PathVariable Long id, 
            Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(maintenanceRequestService.rescueRequest(id, userPrincipal.getId()));
    }

    @PostMapping("/employee/{id}/maintenance")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<MaintenanceRequestResponseDTO> executeMaintenance(
            @PathVariable Long id, 
            @RequestBody MaintenanceRecordDTO dto, 
            Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(maintenanceRequestService.executeMaintenance(id, dto, userPrincipal.getId()));
    }

    @PostMapping("/employee/{id}/redirect")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<MaintenanceRequestResponseDTO> redirectMaintenance(
            @PathVariable Long id, 
            @RequestParam Long targetEmployeeId, 
            Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(maintenanceRequestService.redirectMaintenance(id, targetEmployeeId, userPrincipal.getId()));
    }

    @PostMapping("/client/{id}/pay")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<MaintenanceRequestResponseDTO> payRequest(
            @PathVariable Long id, 
            Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(maintenanceRequestService.payRequest(id, userPrincipal.getId()));
    }

    @PostMapping("/employee/{id}/finalize")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<MaintenanceRequestResponseDTO> finalizeRequest(
            @PathVariable Long id, 
            Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(maintenanceRequestService.finalizeRequest(id, userPrincipal.getId()));
    }
}