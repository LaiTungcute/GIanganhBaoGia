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
    private long productId;
    private String productCode;
    private String productName;
    private String image;
    private String origin;
    private String description;
    private String unit;
    private int qty;
    private double price;
    private boolean deleted;
}
