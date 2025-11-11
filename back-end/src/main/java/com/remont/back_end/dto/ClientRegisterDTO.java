package com.remont.back_end.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.br.CPF;
import lombok.*;

/**
 * DTO para o Autocadastro de Cliente.
 */
public class ClientRegisterDTO {

    @NotBlank @CPF @Getter @Setter
    private String cpf;

    @NotBlank @Getter @Setter
    private String name;

    @NotBlank @Email @Getter @Setter
    private String email;

    @NotBlank @Getter @Setter
    private String phoneNumber;

    @NotBlank @Size(min = 8, max = 8) @Getter @Setter
    private String zipCode;

    @NotBlank @Getter @Setter
    private String street;

    @NotBlank @Getter @Setter
    private String number;

    @Getter @Setter
    private String complement;

    @NotBlank @Getter @Setter
    private String neighborhood;

    @NotBlank @Getter @Setter
    private String city;

    @NotBlank @Size(min = 2, max = 2) @Getter @Setter
    private String state;


}