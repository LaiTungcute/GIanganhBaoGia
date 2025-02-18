package com.example.demo.Repository;

import com.example.demo.Entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "SELECT p.* FROM product p "
            + "JOIN category c ON p.category_id = c.category_id "
            + "WHERE (:categoryName IS NULL OR c.category_name LIKE CONCAT('%', :categoryName, '%')) "
            + "AND (:productName IS NULL OR p.product_name LIKE CONCAT('%', :productName, '%'))",
            countQuery = "SELECT COUNT(*) FROM product p "
                    + "JOIN category c ON p.category_id = c.category_id "
                    + "WHERE (:categoryName IS NULL OR c.category_name LIKE CONCAT('%', :categoryName, '%')) "
                    + "AND (:productName IS NULL OR p.product_name LIKE CONCAT('%', :productName, '%'))",
            nativeQuery = true)
    Page<Product> findProducts(Pageable pageable, @Param("categoryName") String categoryName, @Param("productName") String productName);

    Optional<Product> findByProductName(String productName);
}
