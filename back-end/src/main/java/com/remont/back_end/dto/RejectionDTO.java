package com.remont.back_end.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RejectionDTO {
    @NotBlank(message = "O motivo da rejeição é obrigatório")
    private String rejectionReason;
}