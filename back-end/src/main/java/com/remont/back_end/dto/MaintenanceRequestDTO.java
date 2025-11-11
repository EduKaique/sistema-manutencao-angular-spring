package com.remont.back_end.dto;

import com.remont.back_end.model.MaintenanceRequest;
import jakarta.validation.constraints.NotBlank;

public class MaintenanceRequestDTO {
    private Long id;

    @NotBlank

    private String maintenanceDesc;

    private String guidanceClient;

    private Long requestId;

    public MaintenanceRequestDTO() {}

    public MaintenanceRequestDTO(Long id, String maintenanceDesc, String guidanceClient, Long requestId) {
        this.id = id;
        this.maintenanceDesc = maintenanceDesc;
        this.guidanceClient = guidanceClient;
        this.requestId = requestId;
    }

    public static MaintenanceRequestDTO fromEntity(MaintenanceRequest e) {
        return new MaintenanceRequestDTO(
            e.getId(),
            e.getMaintenanceDesc(),
            e.getGuidanceClient(),
            e.getRequestId()
        );
    }

    public MaintenanceRequest toEntity() {
        MaintenanceRequest e = new MaintenanceRequest();
        e.setId(this.id);
        e.setMaintenanceDesc(this.maintenanceDesc);
        e.setGuidanceClient(this.guidanceClient);
        e.setRequestId(this.requestId);
        return e;
    }

    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMaintenanceDesc() { return maintenanceDesc; }
    public void setMaintenanceDesc(String maintenanceDesc) { this.maintenanceDesc = maintenanceDesc; }
    public String getGuidanceClient() { return guidanceClient; }
    public void setGuidanceClient(String guidanceClient) { this.guidanceClient = guidanceClient; }
    public Long getRequestId() { return requestId; }
    public void setRequestId(Long requestId) { this.requestId = requestId; }
}
