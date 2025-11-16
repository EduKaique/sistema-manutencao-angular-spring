package com.remont.back_end.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * Entidade principal para a Solicitação de Manutenção (RF004).
 */
@Data
@Entity
@Table(name = "service_requests")
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String equipmentName;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String defectDescription;

    @Column(nullable = false)
    private LocalDateTime requestDate;

    @ManyToOne(fetch = FetchType.EAGER) 
    @JoinColumn(name = "status_id", nullable = false)
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEquipment category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = true)
    private Employee assignedEmployee;
}