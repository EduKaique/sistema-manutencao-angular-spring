package com.remont.back_end.repository;

import com.remont.back_end.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {

    Budget save(String budget);

}