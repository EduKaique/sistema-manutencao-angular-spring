package com.remont.back_end.service;

public interface EmailService {

    /**
     * Envia a senha aleatória para o cliente no ato do autocadastro.
     * @param toEmail O e-mail do novo cliente.
     * @param password A senha de 4 dígitos gerada.
     */
    void sendRandomPasswordEmail(String toEmail, String password);
}