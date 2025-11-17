package com.remont.back_end.repository;

import com.remont.back_end.model.Status;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepository extends JpaRepository<Status, Short> {
    boolean existsByName(String name);

    Optional<Status> findByName(String name);
}