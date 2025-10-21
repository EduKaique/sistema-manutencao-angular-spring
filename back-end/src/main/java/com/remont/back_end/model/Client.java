package com.remont.back_end.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.br.CPF;

@Entity
@Table(name = "clients")
@PrimaryKeyJoinColumn(name = "user_id") 
public class Client extends User {

    @NotBlank(message = "CPF é obrigatório")
    @CPF(message = "CPF inválido")
    @Column(nullable = false, unique = true, length = 11) 
    private String cpf;

    @NotBlank(message = "O número de celular é obrigatório")
    @Column(nullable = false, length = 15)
    private String phoneNumber;
    

    @NotBlank(message = "CEP é obrigatório")
    @Size(min = 8, max = 8, message = "CEP deve conter 8 dígitos")
    @Column(nullable = false, length = 8)
    private String zipCode; 
    
    @NotBlank
    @Column(nullable = false)
    private String street;
    
    @NotBlank
    @Column(nullable = false)
    private String number; 
    
    private String complement; 
    
    @NotBlank
    @Column(nullable = false)
    private String neighborhood; 
    
    @NotBlank
    @Column(nullable = false)
    private String city; 
    
    @NotBlank
    @Size(min = 2, max = 2, message = "Estado deve ter 2 caracteres")
    @Column(nullable = false, length = 2)
    private String state; 

    
    public Client() {
        super();
        this.setRole(Role.ROLE_CLIENT); 
    }

    
    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getComplement() {
        return complement;
    }

    public void setComplement(String complement) {
        this.complement = complement;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}