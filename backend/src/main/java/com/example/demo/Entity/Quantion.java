package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
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

    @Column(name = "status")
    private boolean status;

    @Column(name = "deleted")
    private boolean deleted;

    @Column(name = "start_date")
    private LocalDate startDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "quantion")
    private Set<QuantionItem> quantionItems;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
}
