package com.remont.back_end.repository;

import com.remont.back_end.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findAllByActiveTrue();

    long countByActiveTrue();
}