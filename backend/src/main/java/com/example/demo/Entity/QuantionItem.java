package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "QuantionItem")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuantionItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quantion_item_id")
    private Long id;

    @Column(name = "quantion_item_qty")
    private int quantionItemQty;

    @Column(name = "quantion_item_labol")
    private double labol;

    @Column(name = "quantion_item_price")
    private double price;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "quantion_id")
    private Quantion quantion;
}
