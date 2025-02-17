package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "Quantion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Quantion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quantion_id")
    private Long id;

    @Column(name = "quantion_name")
    private String quantionName;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "customer_unit")
    private String customerUnit;

    @Column(name = "customer_address")
    private String customerAddress;

    @Column(name = "customer_email")
    private String customerEmail;

    @Column(name = "customer_phone_number")
    private String customerPhoneNumber;

    @Column(name = "status")
    private boolean status;

    @Column(name = "total")
    private double total;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "quantion")
    private Set<QuantionItem> quantionItems;
}
