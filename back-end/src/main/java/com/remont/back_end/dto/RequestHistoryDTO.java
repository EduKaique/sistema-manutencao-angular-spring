package com.remont.back_end.dto;

import com.remont.back_end.model.RequestHistory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestHistoryDTO {

    private Long id;
    private String title;
    private LocalDateTime occurrenceDate;
    
    private String userName; 
    private String statusName;
    private String statusColor;

    public static RequestHistoryDTO fromEntity(RequestHistory history) {
        return new RequestHistoryDTO(
            history.getId(),
            history.getTitle(),
            history.getOccurrenceDate(),
            history.getUser().getName(), 
            history.getStatus().getName(),
            history.getStatus().getColor()
        );
    }
}