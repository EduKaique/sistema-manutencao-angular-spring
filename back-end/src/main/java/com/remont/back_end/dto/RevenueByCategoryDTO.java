package com.remont.back_end.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RevenueByCategoryDTO {
    private String categoryName;
    private BigDecimal totalRevenue;
}