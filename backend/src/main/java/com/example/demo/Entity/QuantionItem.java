package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

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

    @Column(name = "quantion_item_total_price")
    private double totalPrice;

    @Column(name = "note")
    private String note;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "quantion_id")
    private Quantion quantion;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        QuantionItem quantionItem = (QuantionItem) obj;
        return Objects.equals(product.getProductName(), quantionItem.product.getProductName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(product.getProductName());
    }
}
