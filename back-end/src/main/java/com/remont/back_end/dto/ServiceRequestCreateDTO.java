package com.remont.back_end.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * DTO para receber os dados da criação de uma solicitação.
 */
@Data
public class ServiceRequestCreateDTO {

    @NotBlank(message = "O nome do equipamento é obrigatório")
    @Size(max = 100)
    private String equipmentName; 

    @NotBlank(message = "A descrição do defeito é obrigatória")
    private String defectDescription;

    @NotNull(message = "A categoria é obrigatório")
    private Integer categoryId; 
}