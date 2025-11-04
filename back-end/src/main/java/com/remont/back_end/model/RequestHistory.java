package com.remont.back_end.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "historico_solicitacoes",
       indexes = {
           @Index(name = "idx_solicitacao_id", columnList = "solicitacao_id"),
           @Index(name = "idx_usuario_id", columnList = "usuario_id"),
           @Index(name = "idx_status_id", columnList = "status_id"),
           @Index(name = "idx_data_solicitacao", columnList = "data_solicitacao")
       })
public class RequestHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "O título é obrigatório")
    @Size(max = 32, message = "O título deve ter no máximo 32 caracteres")
    @Column(length = 32, nullable = false)
    private String titulo;
    
    
    @NotNull(message = "A data de solicitação é obrigatória")
    @Column(name = "data_solicitacao", nullable = false)
    private LocalDateTime dataSolicitacao;
    
    @NotNull(message = "O ID da solicitação é obrigatório")
    @Column(name = "solicitacao_id", nullable = false)
    private Long solicitacaoId;
    
    @NotNull(message = "O ID do usuário é obrigatório")
    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;
    
    @NotNull(message = "O ID do status é obrigatório")
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