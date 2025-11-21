package com.remont.back_end.repository;

import com.remont.back_end.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findAllByActiveTrue();

    long countByActiveTrue();

    Optional<Employee> findByEmail(String email);
}