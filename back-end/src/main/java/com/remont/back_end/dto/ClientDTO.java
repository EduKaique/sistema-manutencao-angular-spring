package com.remont.back_end.dto;

import com.remont.back_end.model.Client;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientDTO {

    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    private String name;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "CPF é obrigatório")
    private String cpf;

    @NotBlank(message = "Telefone é obrigatório")
    private String phoneNumber;

    @NotBlank(message = "CEP é obrigatório")
    @Size(min = 8, max = 8, message = "CEP deve ter 8 dígitos")
    private String zipCode;

    @NotBlank(message = "Rua é obrigatória")
    private String street;

    @NotBlank(message = "Número é obrigatório")
    private String number;

    private String complement;

    @NotBlank(message = "Bairro é obrigatório")
    private String neighborhood;

    @NotBlank(message = "Cidade é obrigatória")
    private String city;

    @NotBlank(message = "Estado é obrigatório")
    @Size(min = 2, max = 2, message = "Estado deve ter 2 caracteres")
    private String state;

    /**
     * Converte a Entidade Client para ClientDTO.
     */
    public static ClientDTO fromEntity(Client client) {
        if (client == null) {
            return null;
        }
        
        return new ClientDTO(
            client.getId(),
            client.getName(),
            client.getEmail(),
            client.getCpf(),
            client.getPhoneNumber(),
            client.getZipCode(),
            client.getStreet(),
            client.getNumber(),
            client.getComplement(),
            client.getNeighborhood(),
            client.getCity(),
            client.getState()
        );
    }
}