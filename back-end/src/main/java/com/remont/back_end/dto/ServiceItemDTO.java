package com.remont.back_end.dto;

import com.remont.back_end.model.ServiceItem;
import java.math.BigDecimal;

public class ServiceItemDTO {
    private Long id;
    private String nome;
    private BigDecimal valorServico;

    public ServiceItemDTO() {}

    public ServiceItemDTO(Long id, String nome, BigDecimal valorServico) {
        this.id = id;
        this.nome = nome;
        this.valorServico = valorServico;
    }

    public static ServiceItemDTO fromEntity(ServiceItem s) {
        return new ServiceItemDTO(s.getId(), s.getNome(), s.getValorServico());
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public BigDecimal getValorServico() { return valorServico; }

    public void setId(Long id) { this.id = id; }
    public void setNome(String nome) { this.nome = nome; }
    public void setValorServico(BigDecimal valorServico) { this.valorServico = valorServico; }
}