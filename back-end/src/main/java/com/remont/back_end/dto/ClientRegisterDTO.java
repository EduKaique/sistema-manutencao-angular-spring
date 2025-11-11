package com.remont.back_end.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.br.CPF;
import lombok.Data;

/**
 * DTO para o Autocadastro de Cliente.
 * @Data inclui @Getter, @Setter, @ToString, @EqualsAndHashCode
 */
@Data
public class ClientRegisterDTO {

    @NotBlank @CPF
    private String cpf;

    @NotBlank
    private String name;

    @NotBlank @Email
    private String email;

    @NotBlank
    private String phoneNumber;

    @NotBlank @Size(min = 8, max = 8)
    private String zipCode;

    @NotBlank
    private String street;

    @NotBlank
    private String number;

    private String complement;

    @NotBlank
    private String neighborhood;

    @NotBlank
    private String city;

    @NotBlank @Size(min = 2, max = 2)
    private String state;
}