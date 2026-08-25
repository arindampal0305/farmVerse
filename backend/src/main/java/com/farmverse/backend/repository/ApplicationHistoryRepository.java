package com.farmverse.backend.repository;

import com.farmverse.backend.entity.ApplicationHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationHistoryRepository extends JpaRepository<ApplicationHistory, Long> {

    List<ApplicationHistory> findByUsernameOrderByTimestampDesc(String username);

    List<ApplicationHistory> findAllByOrderByTimestampDesc();
}