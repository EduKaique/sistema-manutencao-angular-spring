package com.remont.back_end.controller;

import com.remont.back_end.dto.ServiceItemDTO;
import com.remont.back_end.model.ServiceItem;
import com.remont.back_end.service.ServiceItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class ServiceItemController {

    private final ServiceItemService service;

    public ServiceItemController(ServiceItemService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ServiceItemDTO>> getAll() {
        List<ServiceItemDTO> result = service.findAll()
                .stream()
                .map(ServiceItemDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceItemDTO> getById(@PathVariable Long id) {
        ServiceItem s = service.findByIdOrThrow(id);
        return ResponseEntity.ok(ServiceItemDTO.fromEntity(s));
    }

    @PostMapping
    public ResponseEntity<ServiceItemDTO> create(@RequestBody ServiceItemDTO dto,
                                                 UriComponentsBuilder uriBuilder) {
        ServiceItem saved = service.create(dto);
        URI uri = uriBuilder.path("/api/services/{id}")
                .buildAndExpand(saved.getId()).toUri();
        return ResponseEntity.created(uri).body(ServiceItemDTO.fromEntity(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceItemDTO> update(@PathVariable Long id,
                                                 @RequestBody ServiceItemDTO dto) {
        ServiceItem updated = service.update(id, dto);
        return ResponseEntity.ok(ServiceItemDTO.fromEntity(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}