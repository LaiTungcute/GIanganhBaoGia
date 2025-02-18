package com.example.demo.Request;

import com.example.demo.Entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class QuantionItemRequest {
    private int quantionItemQty;
    private double quantionItemLabol;
    private String productName;
}
