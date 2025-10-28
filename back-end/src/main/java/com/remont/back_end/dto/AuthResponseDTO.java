package com.remont.back_end.dto;

/**
 * DTO para a resposta de autenticação.
 * Envia o token de acesso (JWT) e informações básicas do usuário.
 */
public class AuthResponseDTO {

    private String token;
    private String userName;
    private String userRole; 

    public AuthResponseDTO(String token, String userName, String userRole) {
        this.token = token;
        this.userName = userName;
        this.userRole = userRole;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
}