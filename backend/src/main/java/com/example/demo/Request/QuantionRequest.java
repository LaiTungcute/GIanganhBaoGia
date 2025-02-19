package com.example.demo.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuantionRequest {
    private String quantionName;
    private String email;
    private String customerName;
    private String customerUnit;
    private String customerAddress;
    private String customerEmail;
    private String customerPhoneNumber;
    private List<QuantionItemRequest> quantionItemRequests;
}
