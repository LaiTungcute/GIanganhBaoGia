package com.example.demo.Repository;

import com.example.demo.Entity.Quantion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface QuantionRepository extends JpaRepository<Quantion, Long> {
        @Query(value = "SELECT q.* FROM quantion q "
                        + "WHERE "
                        + "(:quantionName IS NULL OR q.quantion_name Like %:quantionName%)"
                        + " AND q.deleted = 0", countQuery = "SELECT COUNT(*) FROM quantion q "
                                        + "WHERE "
                                        + "(:quantionName IS NULL OR q.quantion_name Like %:quantionName%)"
                                        + " AND q.deleted = 0", nativeQuery = true)
        Page<Quantion> findQuantion(Pageable pageable, @Param("quantionName") String quantionName);

        @Query(value = "SELECT q.* FROM quantion q "
                        + "JOIN user u ON u.user_id = q.user_id "
                        + "WHERE "
                        + "(:username IS NULL OR u.username Like %:username%)"
                        + " AND q.deleted = 0", countQuery = "SELECT COUNT(*) FROM quantion q "
                                        + "JOIN user u ON u.user_id = q.user_id "
                                        + "WHERE "
                                        + "(:username IS NULL OR u.username Like %:username%)"
                                        + " AND q.deleted = 0", nativeQuery = true)
        Page<Quantion> findByUsername(@Param("username") String username, Pageable pageable);
}
