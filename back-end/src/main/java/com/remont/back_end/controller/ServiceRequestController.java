package com.remont.back_end.controller;

import com.remont.back_end.dto.ServiceRequestCreateDTO;
import com.remont.back_end.dto.ServiceRequestResponseDTO;
import com.remont.back_end.service.ServiceRequestService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/requests")
public class ServiceRequestController {

    @Autowired
    private ServiceRequestService serviceRequestService;

    /**
     * Endpoint para o Cliente criar uma nova solicitação de manutenção.
     *
     * @param createDTO O corpo da requisição com os dados do RF004.
     * @param authentication Objeto injetado pelo Spring Security contendo os dados do usuário logado (do token JWT).
     * @return ResponseEntity com o DTO da solicitação criada
     * .
     */
    @PostMapping
    @PreAuthorize("hasRole('CLIENT')") // Garante que apenas usuários com ROLE_CLIENT podem usar
    public ResponseEntity<ServiceRequestResponseDTO> createRequest(
            @Valid @RequestBody ServiceRequestCreateDTO createDTO,
            Authentication authentication) {

        String clientEmail = authentication.getName();

        ServiceRequestResponseDTO newRequest = serviceRequestService.createServiceRequest(createDTO, clientEmail);

        return new ResponseEntity<>(newRequest, HttpStatus.CREATED);
    }
}