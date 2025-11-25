package com.remont.back_end.controller;

import com.remont.back_end.model.StatusEnum;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
public class StatusEnumController {

    @GetMapping("/api/status-enum")
    public StatusEnum[] getAll() {
        return StatusEnum.values();
    }
}