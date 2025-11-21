package com.remont.back_end.controller;

import com.remont.back_end.dto.RequestHistoryDTO;
import com.remont.back_end.service.RequestHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
public class RequestHistoryController {

    @Autowired
    private RequestHistoryService historyService;


    @GetMapping("/{id}/history")
    @PreAuthorize("hasAnyRole('CLIENT', 'EMPLOYEE')")
    public ResponseEntity<List<RequestHistoryDTO>> getRequestHistory(@PathVariable Long id) {
        // TODO: Idealmente validar se o CLIENT logado é dono dessa requestl
        return ResponseEntity.ok(historyService.getHistoryByRequestId(id));
    }
}