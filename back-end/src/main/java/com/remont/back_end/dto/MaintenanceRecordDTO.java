package com.remont.back_end.dto;

import com.remont.back_end.model.MaintenanceRecord;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceRecordDTO {

    private Long id;

    @NotBlank(message = "A descrição da manutenção é obrigatória")
    private String maintenanceDescription;

    @NotBlank(message = "As orientações para o cliente são obrigatórias")
    private String clientGuidelines;

    private Long maintenanceRequestId;

    /**
     * Converte a Entidade para DTO.
     */
    public static MaintenanceRecordDTO fromEntity(MaintenanceRecord e) {
        return new MaintenanceRecordDTO(
            e.getId(),
            e.getMaintenanceDescription(),
            e.getClientGuidelines(),
            e.getMaintenanceRequest() != null ? e.getMaintenanceRequest().getId() : null
        );
    }

    /**
     * Converte DTO para Entidade.
     */
    public MaintenanceRecord toEntity() {
        MaintenanceRecord e = new MaintenanceRecord();
        e.setId(this.id);
        e.setMaintenanceDescription(this.maintenanceDescription);
        e.setClientGuidelines(this.clientGuidelines);

        return e;
    }
}