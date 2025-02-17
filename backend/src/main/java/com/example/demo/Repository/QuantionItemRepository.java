package com.example.demo.Repository;

import com.example.demo.Entity.QuantionItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuantionItemRepository extends JpaRepository<QuantionItem, Long> {
}
