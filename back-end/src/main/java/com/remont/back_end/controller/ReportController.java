package com.remont.back_end.controller;

import com.remont.back_end.dto.RevenueByCategoryDTO;
import com.remont.back_end.dto.RevenueByDateDTO;
import com.remont.back_end.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    /**
     * Lista de Receita por Período (JSON)
     */
    @GetMapping("/date")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<List<RevenueByDateDTO>> getRevenueByDateData(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        
        return ResponseEntity.ok(reportService.getRevenueByDateData(start, end));
    }

    /**
     * Lista de Receita por Categoria 
     */
    @GetMapping("/category")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<List<RevenueByCategoryDTO>> getRevenueByCategoryData() {
        
        return ResponseEntity.ok(reportService.getRevenueByCategoryData());
    }

    /**
     *  Gera o PDF de Receitas por Período
     */
    @GetMapping("/date/pdf")
    @PreAuthorize("hasRole('EMPLOYEE')") 
    public void generateRevenueByDateReport(
            HttpServletResponse response,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) throws IOException {

        response.setContentType("application/pdf");
        
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=receitas_data_" + currentDateTime + ".pdf";
        
        response.setHeader(headerKey, headerValue);

        reportService.exportRevenueByDatePdf(response, start, end);
    }

    /**
     *  Gera o PDF de Receitas por Categoria
     */
    @GetMapping("/category/pdf")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public void generateRevenueByCategoryReport(HttpServletResponse response) throws IOException {

        response.setContentType("application/pdf");
        
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=receitas_categoria_" + currentDateTime + ".pdf";
        
        response.setHeader(headerKey, headerValue);

        reportService.exportRevenueByCategoryPdf(response);
    }

}