package com.remont.back_end.service;

import com.remont.back_end.dto.ClientDTO;
import com.remont.back_end.dto.ClientRegisterDTO;
import com.remont.back_end.model.Client;
import com.remont.back_end.repository.ClientRepository;
import com.remont.back_end.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;

@Service
public class RegistrationServiceImpl implements RegistrationService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private UserRepository userRepository; 

    @Autowired
    private PasswordEncoder passwordEncoder; 

    @Autowired
    private EmailService emailService; 

    private final SecureRandom random = new SecureRandom();

    @Override
    @Transactional
    public ClientDTO registerNewClient(ClientRegisterDTO registerDTO) {
        if (clientRepository.existsByCpf(registerDTO.getCpf())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "CPF já cadastrado");
        }
        if (userRepository.existsByEmail(registerDTO.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email já cadastrado");
        }

        String randomPassword = String.format("%04d", random.nextInt(10000));

        Client client = convertToEntity(registerDTO);
        
        client.setPassword(passwordEncoder.encode(randomPassword));

        Client savedClient = clientRepository.save(client);

        emailService.sendRandomPasswordEmail(savedClient.getEmail(), randomPassword);

        return convertToDTO(savedClient);
    }

    /**
     * Converte o DTO de registro para a entidade Client.
     */
    private Client convertToEntity(ClientRegisterDTO dto) {
        Client client = new Client();
        client.setName(dto.getName());
        client.setEmail(dto.getEmail());
        client.setCpf(dto.getCpf());
        client.setPhoneNumber(dto.getPhoneNumber());
        client.setZipCode(dto.getZipCode());
        client.setStreet(dto.getStreet());
        client.setNumber(dto.getNumber());
        client.setComplement(dto.getComplement());
        client.setNeighborhood(dto.getNeighborhood());
        client.setCity(dto.getCity());
        client.setState(dto.getState());
        return client;
    }

    /**
     * Converte a entidade Client para o DTO de resposta.
     */
    private ClientDTO convertToDTO(Client client) {
        ClientDTO dto = new ClientDTO();
        dto.setId(client.getId());
        dto.setName(client.getName());
        dto.setEmail(client.getEmail());
        dto.setCpf(client.getCpf());
        dto.setPhoneNumber(client.getPhoneNumber());
        dto.setZipCode(client.getZipCode());
        dto.setStreet(client.getStreet());
        dto.setNumber(client.getNumber());
        dto.setComplement(client.getComplement());
        dto.setNeighborhood(client.getNeighborhood());
        dto.setCity(client.getCity());
        dto.setState(client.getState());
        return dto;
    }
}