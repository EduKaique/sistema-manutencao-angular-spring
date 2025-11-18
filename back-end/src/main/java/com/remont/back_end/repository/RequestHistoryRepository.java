package com.remont.back_end.repository;

import com.remont.back_end.model.RequestHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestHistoryRepository extends JpaRepository<RequestHistory, Long> {
    
    /**
     * Busca histórico por solicitação ordenado por data
     */
    List<RequestHistory> findBySolicitacaoIdOrderByDataSolicitacaoDesc(Long solicitacaoId);
}