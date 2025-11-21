package com.remont.back_end.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "maintenance_records")
public class MaintenanceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String maintenanceDescription;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String clientGuidelines;

    @Column(nullable = false)
    private LocalDateTime finishedAt;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @OneToOne
    @JoinColumn(name = "request_id", nullable = false, unique = true)
    private MaintenanceRequest maintenanceRequest;

}