package com.example.demo.Repository;

import com.example.demo.Entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "SELECT p.* FROM product p "
            + "JOIN category c ON p.category_id = c.category_id "
            + "WHERE "
            + "(:categoryName IS NULL OR c.category_name Like %:categoryName%)"
            + "AND (:productName IS NULL OR p.product_name Like %:productName%)",
            countQuery = "SELECT COUNT(*) FROM product p JOIN "
                    + "JOIN category c ON p.category_id = c.category_id "
                    + "WHERE "
                    + "AND (:categoryName IS NULL OR c.category_name Like %:categoryName%)"
                    + "AND (:productName IS NULL OR p.product_name Like %:productName%)",
            nativeQuery = true)
    Page<Product> findProducts(Pageable pageable, @Param("categoryName") String categoryName, @Param("productName") String productName);
}
