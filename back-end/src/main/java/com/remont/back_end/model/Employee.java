package com.remont.back_end.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "employees")
@PrimaryKeyJoinColumn(name = "user_id")
public class Employee extends User {

    @Column(name = "cpf", length = 14)
    private String cpf;

    @Column(name = "phone", length = 20)
    private String phone;

    @NotNull(message = "Data de nascimento é obrigatória")
    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @Column(name = "wage")
    private Double wage;

    @Column(nullable = false)
    private boolean active = true;

    public Employee() {
        super();
        this.setRole(Role.ROLE_EMPLOYEE);
    }

    public Employee(String name, String email, String password, String cpf, 
                    String phone, LocalDate birthDate, Double wage) {
        super(name, email, password, Role.ROLE_EMPLOYEE);
        this.cpf = cpf;
        this.phone = phone;
        this.birthDate = birthDate;
        this.wage = wage;
        this.active = true;
    }
}