package com.remont.back_end.service;

import com.remont.back_end.model.Status;
import com.remont.back_end.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.Optional;
import java.util.List;
import java.util.Objects;

@Service
public class StatusService {
    @Autowired
    private StatusRepository repository;

    public List<Status> getAll() {
        return repository.findAll();
    }

    public Optional<Status> getById(Short id) {
        return repository.findById(Objects.requireNonNull(id));
    }

    public Status create(Status status) {
        if (status.getName() != null && repository.existsByName(status.getName())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Status já existe");
        }
        return repository.save(status);
    }

    public Status update(Short id, Status newStatus) {
        Status existing = repository.findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Status não encontrado"));

        if (newStatus.getName() != null) {
            existing.setName(newStatus.getName());
        }
        if (newStatus.getColor() != null) {
            existing.setColor(newStatus.getColor());
        }

        return repository.save(Objects.requireNonNull(existing));
    }

    public void delete(Short id) {
        if (!repository.existsById(Objects.requireNonNull(id))) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Status não encontrado");
        }
        repository.deleteById(id);
    }
}