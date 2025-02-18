package com.example.demo.Repository;

import com.example.demo.Entity.Quantion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuantionRepository extends JpaRepository<Quantion, Long> {
    @Query(value = "SELECT q.* FROM quantion q "
            + "JOIN product p ON q.product_id = p.product_id "
            + "WHERE "
            + "(:productName IS NULL OR p.product_name Like %:productName%)"
            + "AND (:quantionName IS NULL OR q.quantionName Like %:quantionName%)",
            countQuery = "SELECT COUNT(*) FROM quantion q "
                    + "JOIN product p ON q.product_id = p.product_id "
                    + "WHERE "
                    + "(:productName IS NULL OR p.product_name Like %:productName%)"
                    + "AND (:quantionName IS NULL OR q.quantionName Like %:quantionName%)",
            nativeQuery = true)
    Page<Quantion> findQuantion(Pageable pageable, @Param("productName") String productName, @Param("quantionName") String quantionName);

    Page<Quantion> findByUserId(long userId, Pageable pageable);
}
