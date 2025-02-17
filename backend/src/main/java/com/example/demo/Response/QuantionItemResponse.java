package com.example.demo.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuantionItemResponse {
    private long id;
    private int quantionItemQty;
    private double quantionItemLabol;
    private double price;
    private ProductResponse productResponses;
}
