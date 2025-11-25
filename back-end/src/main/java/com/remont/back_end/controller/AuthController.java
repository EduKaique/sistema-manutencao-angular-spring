package com.remont.back_end.controller;


import com.remont.back_end.dto.LoginResponseDTO;
import com.remont.back_end.dto.ClientDTO;
import com.remont.back_end.dto.ClientRegisterDTO;
import com.remont.back_end.dto.LoginRequestDTO;
import com.remont.back_end.service.LoginService;
import com.remont.back_end.service.RegistrationService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.AuthenticationException; 

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private LoginService loginService; 

    @Autowired
    private RegistrationService registrationService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        try {
            LoginResponseDTO response = loginService.login(loginRequest);
            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body(null); 
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ClientDTO> registerClient(@Valid @RequestBody ClientRegisterDTO registerDTO) {
        try {
            ClientDTO newClient = registrationService.registerNewClient(registerDTO);
            return new ResponseEntity<>(newClient, HttpStatus.CREATED);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(null);
        }
    }
}