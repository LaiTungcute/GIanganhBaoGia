package com.example.demo.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
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
    private BigDecimal totalPrice;
    private boolean status;
    private boolean deleted;
    private LocalDate startDate;
    private List<QuantionItemResponse> quantionItemResponses;
}
