package com.remont.back_end.service;

import com.remont.back_end.dto.ClientDTO;
import com.remont.back_end.model.Client;
import com.remont.back_end.repository.ClientRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientServiceImpl implements ClientService		{

    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;

    public ClientServiceImpl(ClientRepository clientRepository, PasswordEncoder passwordEncoder) {
        this.clientRepository = clientRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Override
    @Transactional
    public ClientDTO createClient(ClientDTO clientDTO) {
        if (clientRepository.existsByCpf(clientDTO.getCpf())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "CPF já cadastrado");
        }
        
        if (clientRepository.existsByEmail(clientDTO.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email já cadastrado");
        }

        Client client = convertToEntity(clientDTO);
        // Senha padrão temporária - o cliente deve alterar no primeiro acesso
        String defaultPassword = "Temp@" + clientDTO.getCpf().substring(0, 4);
        client.setPassword(passwordEncoder.encode(defaultPassword));
        
        Client savedClient = clientRepository.save(client);
        return convertToDTO(savedClient);
    }

    @Override
    public ClientDTO getClientById(Long id) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID não pode ser nulo");
        }
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, 
                        "Cliente não encontrado com ID: " + id));
        return convertToDTO(client);
    }

    public List<ClientDTO> getAllClients() {
        return clientRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ClientDTO updateClient(Long id, ClientDTO clientDTO) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID não pode ser nulo");
        }
        Client existingClient = clientRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, 
                        "Cliente não encontrado com ID: " + id));

        // Atualizar dados pessoais
        existingClient.setName(clientDTO.getName());
        existingClient.setEmail(clientDTO.getEmail());
        existingClient.setPhoneNumber(clientDTO.getPhoneNumber());
        
        // Atualizar endereço
        existingClient.setZipCode(clientDTO.getZipCode());
        existingClient.setStreet(clientDTO.getStreet());
        existingClient.setNumber(clientDTO.getNumber());
        existingClient.setComplement(clientDTO.getComplement());
        existingClient.setNeighborhood(clientDTO.getNeighborhood());
        existingClient.setCity(clientDTO.getCity());
        existingClient.setState(clientDTO.getState());

        Client updatedClient = clientRepository.save(existingClient);
        return convertToDTO(updatedClient);
    }

    @Override
    @Transactional
    public void deleteClient(Long id) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID não pode ser nulo");
        }
        if (!clientRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, 
                    "Cliente não encontrado com ID: " + id);
        }
        clientRepository.deleteById(id);
    }

    private ClientDTO convertToDTO(Client client) {
        return new ClientDTO(
                client.getId(),
                client.getName(),
                client.getEmail(),
                client.getCpf(),
                client.getPhoneNumber(),
                client.getZipCode(),
                client.getStreet(),
                client.getNumber(),
                client.getComplement(),
                client.getNeighborhood(),
                client.getCity(),
                client.getState()
        );
    }

    private Client convertToEntity(ClientDTO dto) {
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
}
