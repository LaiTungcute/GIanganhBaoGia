package com.example.demo.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductRequest {
    private String productCode;
    private String productName;
    private MultipartFile image;
    private String origin;
    private String category;
    private String description;
    private String unit;
    private int qty;
    private double price;
}
