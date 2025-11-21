package com.remont.back_end.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.remont.back_end.model.RequestHistory;

public interface RequestHistoryRepository extends JpaRepository<RequestHistory, Long> {
    List<RequestHistory> findByRequestIdOrderByOccurrenceDateAsc(Long requestId);
}
