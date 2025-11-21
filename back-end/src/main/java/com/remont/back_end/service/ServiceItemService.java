package com.remont.back_end.service;

import com.remont.back_end.dto.ServiceItemDTO;
import com.remont.back_end.model.ServiceItem;
import com.remont.back_end.repository.ServiceItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class ServiceItemService {

    private final ServiceItemRepository repository;

    public ServiceItemService(ServiceItemRepository repository) {
        this.repository = repository;
    }

    public List<ServiceItem> findAll() {
        return repository.findAll();
    }

    public ServiceItem findByIdOrThrow(Long id) {
        // orElseThrow funciona em Optional (Java 8+). Se ainda der erro,
        // é porque repository NÃO é um JpaRepository (verifique o tipo/imports).
        return repository.findById(Objects.requireNonNull(id))
                .orElseThrow();
    }

    @Transactional
    public ServiceItem create(ServiceItemDTO dto) {
        if (dto.getNome() == null || dto.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome do serviço é obrigatório");
        }
        if (dto.getValorServico() == null) {
            throw new IllegalArgumentException("Valor do serviço é obrigatório");
        }
        if (repository.existsByNomeIgnoreCase(dto.getNome())) {
            throw new IllegalArgumentException("Já existe um serviço com esse nome");
        }

        ServiceItem s = new ServiceItem(dto.getNome(), dto.getValorServico());
        return repository.save(s);
    }

    @Transactional
    public ServiceItem update(Long id, ServiceItemDTO dto) {
        ServiceItem s = findByIdOrThrow(id);

        if (dto.getNome() != null && !dto.getNome().isBlank()) {
            s.setNome(dto.getNome());
        }
        if (dto.getValorServico() != null) {
            s.setValorServico(dto.getValorServico());
        }

        return repository.save(Objects.requireNonNull(s));
    }

    @Transactional
    public void delete(Long id) {
        ServiceItem s = findByIdOrThrow(id);
        repository.delete(Objects.requireNonNull(s));
    }
}
