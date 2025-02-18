package com.example.demo.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class QuantionResponse {
    private Long id;
    private String quantionName;
    private String username;
    private String email;
    private String phoneNumber;
    private String roles;
    private String customerName;
    private String customerUnit;
    private String customerAddress;
    private String customerEmail;
    private String customerPhoneNumber;
    private double totalPrice;
    private boolean status;
    private List<QuantionItemResponse> quantionItemResponses;
}
