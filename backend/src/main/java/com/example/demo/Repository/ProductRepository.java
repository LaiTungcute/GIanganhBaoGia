package com.example.demo.Repository;

import com.example.demo.Entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "SELECT p.* FROM product p "
            + "WHERE (:productName IS NULL OR p.product_name LIKE CONCAT('%', :productName, '%')) "
            + "AND (p.deleted = 0)",
            countQuery = "SELECT COUNT(*) FROM product p "
                    + "WHERE (:productName IS NULL OR p.product_name LIKE CONCAT('%', :productName, '%')) "
                    + "AND (p.deleted = 0)",
            nativeQuery = true)
    Page<Product> findProducts(Pageable pageable, @Param("productName") String productName);

    Optional<Product> findByProductName(String productName);

    @Query(value = "SELECT p.* FROM product p "
            + "WHERE (p.deleted = 0)", nativeQuery = true)
    List<Product> findProductList();
}
