package com.remont.back_end.repository;

import java.time.LocalDateTime;
import java.util.List;

import com.remont.back_end.dto.RevenueByCategoryDTO;
import com.remont.back_end.dto.RevenueByDateDTO;
import com.remont.back_end.model.Client;
import com.remont.back_end.model.MaintenanceRequest;
import com.remont.back_end.model.StatusEnum;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequest, Long> {
    
    List<MaintenanceRequest> findByClientOrderByRequestDateAsc(Client client);
    List<MaintenanceRequest> findAllByOrderByRequestDateAsc();

    @Query("SELECT new com.remont.back_end.dto.RevenueByDateDTO(CAST(r.requestDate as LocalDate), SUM(b.total)) " +
           "FROM MaintenanceRequest r " +
           "JOIN r.budgets b " +
           "WHERE r.status IN :paidStatuses " +
           "AND r.requestDate BETWEEN :startDate AND :endDate " +
           "GROUP BY CAST(r.requestDate as LocalDate) " +
           "ORDER BY CAST(r.requestDate as LocalDate) ASC")
    List<RevenueByDateDTO> getRevenueByDate(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("paidStatuses") List<StatusEnum> paidStatuses);

    @Query("SELECT new com.remont.back_end.dto.RevenueByCategoryDTO(c.name, SUM(b.total)) " +
           "FROM MaintenanceRequest r " +
           "JOIN r.category c " +
           "JOIN r.budgets b " +
           "WHERE r.status IN :paidStatuses " +
           "GROUP BY c.name " +
           "ORDER BY SUM(b.total) DESC")
    List<RevenueByCategoryDTO> getRevenueByCategory(
            @Param("paidStatuses") List<StatusEnum> paidStatuses);
}