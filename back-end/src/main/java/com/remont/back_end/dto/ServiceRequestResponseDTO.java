package com.remont.back_end.dto;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * DTO para enviar a resposta de uma solicitação criada ou consultada.
 */
@Data
public class ServiceRequestResponseDTO {

    private Long id;
    private String equipmentName;
    private String defectDescription;
    private LocalDateTime requestDate;
    private String statusName;
    private String statusColor;
    private String categoryName;
    private String clientName;
}