package com.remont.back_end.config;

import com.remont.back_end.model.Employee;
import com.remont.back_end.repository.EmployeeRepository;
import com.remont.back_end.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.time.LocalDate;

/**
 * Carga de dados inicial para testes.
 * Cria um funcionário "admin" padrão se ele não existir.
 */
@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; 

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "admin@remont.com";

        if (!userRepository.existsByEmail(adminEmail)) {
            
            System.out.println("Criando usuário ADMIN padrão...");

            Employee admin = new Employee();
            admin.setName("Admin");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("123456")); 
            admin.setBirthDate(LocalDate.of(2000, 1, 1));
            
            employeeRepository.save(admin);
            
            System.out.println("Usuário ADMIN criado com sucesso!");
            System.out.println("Email: " + adminEmail);
            System.out.println("Senha: 123456");
        } else {
            System.out.println("Usuário ADMIN já existe.");
        }
    }
}