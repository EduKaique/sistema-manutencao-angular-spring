package com.remont.back_end.service;

import com.remont.back_end.dto.LoginResponseDTO;
import com.remont.back_end.dto.LoginRequestDTO;

public interface LoginService {
    
    /**
     * Processa a tentativa de login.
     * @param loginRequest DTO com e-mail e senha.
     * @return DTO com o token e dados do usuário.
     * @throws org.springframework.security.core.AuthenticationException Se as credenciais forem inválidas.
     */
    LoginResponseDTO login(LoginRequestDTO loginRequest);
}