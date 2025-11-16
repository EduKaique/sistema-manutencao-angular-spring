package com.remont.back_end.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * Implementação do serviço de e-mail.
 */
@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.properties.from}")
    private String fromEmail;

    /**
     * Envia a senha aleatória para o cliente no ato do autocadastro.
     */
    @Override
    public void sendRandomPasswordEmail(String toEmail, String password) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Sua conta na Remont foi criada!");
            message.setText("Olá!\n\n"
                    + "Seu cadastro em nosso sistema de manutenções foi realizado com sucesso.\n\n"
                    + "Seu login é o seu e-mail (" + toEmail + ").\n"
                    + "Sua senha de acesso é: " + password + "\n\n"
                    + "Recomendamos que você altere esta senha no seu primeiro acesso.\n\n"
                    + "Atenciosamente,\n"
                    + "Equipe Remont.");

            javaMailSender.send(message);

        } catch (MailException e) {
            throw new RuntimeException("Erro ao enviar e-mail de cadastro: " + e.getMessage());
        }
    }
}