package com.example.demo.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private String productCode;
    private String productName;
    private String image;
    private String origin;
    private String category;
    private String description;
    private String unit;
    private int qty;
    private double price;
    private int status;
}
