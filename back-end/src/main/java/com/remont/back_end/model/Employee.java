package com.remont.back_end.model;

import java.time.LocalDate;
import java.util.Objects;
import jakarta.persistence.*;

/**
 * Representa um usuário Funcionário.
 * Herda de User e adiciona campos específicos do funcionário.
 */
@Entity
@Table(name = "employees") 
@PrimaryKeyJoinColumn(name = "user_id") 
public class Employee extends User { 

    @Column(unique = true)
    private String cpf; 

    private String phone;

    @Column(nullable = false)
    private LocalDate birthDate; 

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

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public Double getWage() {
        return wage;
    }

    public void setWage(Double wage) {
        this.wage = wage;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee that = (Employee) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + getId() + 
                ", name='" + getName() + '\'' + 
                ", email='" + getEmail() + '\'' + 
                '}';
    }
}