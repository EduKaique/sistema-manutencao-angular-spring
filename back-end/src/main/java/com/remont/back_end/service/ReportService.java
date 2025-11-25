package com.remont.back_end.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.remont.back_end.dto.RevenueByCategoryDTO;
import com.remont.back_end.dto.RevenueByDateDTO;
import com.remont.back_end.model.StatusEnum;
import com.remont.back_end.repository.MaintenanceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletResponse;
import java.awt.Color;
import java.io.IOException;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

@Service
public class ReportService {

    @Autowired
    private MaintenanceRequestRepository requestRepository;

    private final List<StatusEnum> REVENUE_STATUSES = Arrays.asList(StatusEnum.PAGA, StatusEnum.FINALIZADA);
    private final Locale BR_LOCALE = Locale.of("pt", "BR");


    /**
     * Retorna os dados de receita por data .
     */
    public List<RevenueByDateDTO> getRevenueByDateData(LocalDate start, LocalDate end) {
        LocalDateTime startDateTime = (start != null) ? start.atStartOfDay() : LocalDateTime.of(2024, 1, 1, 0, 0);
        LocalDateTime endDateTime = (end != null) ? end.atTime(LocalTime.MAX) : LocalDateTime.now();

        return requestRepository.getRevenueByDate(startDateTime, endDateTime, REVENUE_STATUSES);
    }

    /**
     * Retorna os dados de receita por categoria.
     */
    public List<RevenueByCategoryDTO> getRevenueByCategoryData() {
        return requestRepository.getRevenueByCategory(REVENUE_STATUSES);
    }

    public void exportRevenueByDatePdf(HttpServletResponse response, LocalDate start, LocalDate end) throws IOException {
        LocalDateTime startDateTime = (start != null) ? start.atStartOfDay() : LocalDateTime.of(2024, 1, 1, 0, 0);
        LocalDateTime endDateTime = (end != null) ? end.atTime(LocalTime.MAX) : LocalDateTime.now();

        List<RevenueByDateDTO> data = requestRepository.getRevenueByDate(startDateTime, endDateTime, REVENUE_STATUSES);

        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();
        
        Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontTitle.setSize(18);
        Paragraph title = new Paragraph("Relatório de Receitas por Período", fontTitle);
        title.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(title);
        
        document.add(new Paragraph(" "));

        PdfPTable table = new PdfPTable(2); 
        table.setWidthPercentage(100f);
        table.setWidths(new float[] {3.0f, 3.0f});
        table.setSpacingBefore(10);

        writeTableHeader(table, "Data", "Receita (R$)");

        NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(BR_LOCALE);
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        for (RevenueByDateDTO item : data) {
            table.addCell(item.getDate().format(dateFormatter));
            table.addCell(currencyFormat.format(item.getTotalRevenue()));
        }

        document.add(table);
        document.close();
    }

    public void exportRevenueByCategoryPdf(HttpServletResponse response) throws IOException {
        List<RevenueByCategoryDTO> data = requestRepository.getRevenueByCategory(REVENUE_STATUSES);

        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();

        Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontTitle.setSize(18);
        Paragraph title = new Paragraph("Relatório de Receitas por Categoria", fontTitle);
        title.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(title);
        
        document.add(new Paragraph(" "));

        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100f);
        table.setWidths(new float[] {3.5f, 3.5f});
        table.setSpacingBefore(10);

        writeTableHeader(table, "Categoria", "Receita Total (R$)");

        NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(BR_LOCALE);

        for (RevenueByCategoryDTO item : data) {
            table.addCell(item.getCategoryName());
            table.addCell(currencyFormat.format(item.getTotalRevenue()));
        }

        document.add(table);
        document.close();
    }

    private void writeTableHeader(PdfPTable table, String col1, String col2) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(Color.DARK_GRAY);
        cell.setPadding(5);

        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(Color.WHITE);

        cell.setPhrase(new Phrase(col1, font));
        table.addCell(cell);

        cell.setPhrase(new Phrase(col2, font));
        table.addCell(cell);
    }
}