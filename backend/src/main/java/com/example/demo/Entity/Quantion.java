package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @Column(name = "labol")
    private double labol;

    @Column(name = "total")
    private double total;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
