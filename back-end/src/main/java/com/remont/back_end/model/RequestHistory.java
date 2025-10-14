package com.remont.back_end.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "historico_solicitacoes")
public class RequestHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(length = 32, nullable = false)
    private String titulo;
    
    @Column(name = "data_solicitacao", nullable = false)
    private LocalDateTime dataSolicitacao;
    
    @Column(name = "solicitacao_id", nullable = false)
    private Long solicitacaoId;
    
    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;
    
    @Column(name = "status_id", nullable = false)
    private Long statusId;

    public RequestHistory() {}
    
    public RequestHistory(String titulo, LocalDateTime dataSolicitacao, 
                         Long solicitacaoId, Long usuarioId, Long statusId) {
        this.titulo = titulo;
        this.dataSolicitacao = dataSolicitacao;
        this.solicitacaoId = solicitacaoId;
        this.usuarioId = usuarioId;
        this.statusId = statusId;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    
    public LocalDateTime getDataSolicitacao() { return dataSolicitacao; }
    public void setDataSolicitacao(LocalDateTime dataSolicitacao) { 
        this.dataSolicitacao = dataSolicitacao; 
    }
    
    public Long getSolicitacaoId() { return solicitacaoId; }
    public void setSolicitacaoId(Long solicitacaoId) { this.solicitacaoId = solicitacaoId; }
    
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    
    public Long getStatusId() { return statusId; }
    public void setStatusId(Long statusId) { this.statusId = statusId; }
}