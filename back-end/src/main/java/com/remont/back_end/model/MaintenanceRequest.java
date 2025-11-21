package com.remont.back_end.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entidade principal para a Solicitação de Manutenção (RF004).
 */
@Data
@Entity
@Table(name = "maintenance_requests")
public class MaintenanceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String equipmentName;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String defectDescription;

    @Column(nullable = false)
    private LocalDateTime requestDate;

    @Column(nullable = true, columnDefinition = "TEXT")
    private String rejectionReason;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private StatusEnum status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEquipment category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = true)
    private Employee assignedEmployee;

    @OneToMany(mappedBy = "maintenanceRequest", cascade = CascadeType.ALL)
    private List<Budget> budgets = new ArrayList<>();

    @OneToOne(mappedBy = "maintenanceRequest", cascade = CascadeType.ALL)
    private MaintenanceRecord maintenanceRecord;
}