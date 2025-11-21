package com.remont.back_end.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "request_history")
public class RequestHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 64)
    private String title;
    
    @Column(name = "occurrence_date", nullable = false)
    private LocalDateTime occurrenceDate;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id", nullable = false)
    private MaintenanceRequest maintenanceRequest;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private StatusEnum status;

    public RequestHistory(MaintenanceRequest request, User user, StatusEnum status, String title) {
        this.maintenanceRequest = request;
        this.user = user;
        this.status = status;
        this.title = title;
        this.occurrenceDate = LocalDateTime.now();
    }
}