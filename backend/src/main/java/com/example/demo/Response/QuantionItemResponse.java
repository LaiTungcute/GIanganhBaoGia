package com.example.demo.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuantionItemResponse {
    private long id;
    private int quantionItemQty;
    private double quantionItemLabol;
    private BigDecimal price;
    private String productName;
    private String unit;
    private String image;
}
