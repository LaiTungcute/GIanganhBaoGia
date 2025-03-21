package com.example.demo.Repository;

import com.example.demo.Entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    @Query(value = "SELECT c.* FROM customer c "
            + "WHERE "
            + "(:customerName IS NULL OR c.customer_name Like %:customerName%)"
            + "AND c.deleted = 0",
            countQuery = "SELECT COUNT(*) FROM customer c "
            + "WHERE "
            + "(:customerName IS NULL OR c.customer_name Like %:customerName%)"
            + "AND c.deleted = 0",
            nativeQuery = true)
    Page<Customer> findCustomer(Pageable pageable, String customerName);

    Optional<Customer> findByCustomerName(String customerName);
}
