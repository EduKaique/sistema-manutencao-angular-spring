package com.remont.back_end.repository;

import com.remont.back_end.model.Client;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    
    boolean existsByCpf(String cpf);
    
    boolean existsByEmail(String email);

    Optional<Client> findByEmail(String email);
}