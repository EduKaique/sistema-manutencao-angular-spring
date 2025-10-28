package com.remont.back_end.model;

import jakarta.persistence.*;

@Entity
@Table(name = "maintenance_request")
public class MaintenanceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "maintenance_desc", nullable = false)
    private String maintenanceDesc;

    @Column(name = "guidance_client")
    private String guidanceClient;

    @Column(name = "request_id")
    private Long requestId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaintenanceDesc() {
        return maintenanceDesc;
    }

    public void setMaintenanceDesc(String maintenanceDesc) {
        this.maintenanceDesc = maintenanceDesc;
    }

    public String getGuidanceClient() {
        return guidanceClient;
    }

    public void setGuidanceClient(String guidanceClient) {
        this.guidanceClient = guidanceClient;
    }

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }
}