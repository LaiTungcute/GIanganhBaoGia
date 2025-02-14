package com.example.demo.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class QuantionResponse {
    private String quantionName;
    private String productName;
    private String image;
    private double labol;
    private String unit;
    private String origin;
    private int qty;
    private double price;
    private double total;
}
