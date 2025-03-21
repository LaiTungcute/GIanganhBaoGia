package com.example.demo.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRequest {
    private String customerName;
    private String customerEmail;
    private String customerPhoneNumber;
    private String customerAddress;
    private String agency;
}
