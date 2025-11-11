package com.remont.back_end.controller;

import com.remont.back_end.model.Status;
import com.remont.back_end.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/status")
public class StatusController {

    @Autowired
    private StatusService service;

    @GetMapping
    public List<Status> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Status getById(@PathVariable Short id) {
        Optional<Status> status = service.getById(id);
        return status.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Status não encontrado"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Status create(@RequestBody Status status) {
        return service.create(status);
    }

    @PutMapping("/{id}")
    public Status update(@PathVariable Short id, @RequestBody Status status) {
        return service.update(id, status);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Short id) {
        service.delete(id);
    }
}