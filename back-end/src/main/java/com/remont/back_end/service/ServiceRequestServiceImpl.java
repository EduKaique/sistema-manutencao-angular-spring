package com.remont.back_end.service;

import com.remont.back_end.dto.ServiceRequestCreateDTO;
import com.remont.back_end.dto.ServiceRequestResponseDTO;
import com.remont.back_end.exception.ResourceNotFoundException; // (Crie esta classe)
import com.remont.back_end.model.CategoryEquipment;
import com.remont.back_end.model.Client;
import com.remont.back_end.model.RequestHistory;
import com.remont.back_end.model.ServiceRequest;
import com.remont.back_end.model.Status;
import com.remont.back_end.repository.CategoryEquipmentRepository;
import com.remont.back_end.repository.ClientRepository;
import com.remont.back_end.repository.RequestHistoryRepository;
import com.remont.back_end.repository.ServiceRequestRepository;
import com.remont.back_end.repository.StatusRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class ServiceRequestServiceImpl implements ServiceRequestService {

    private static final String STATUS_ABERTA = "ABERTA";

    @Autowired
    private ServiceRequestRepository serviceRequestRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private CategoryEquipmentRepository categoryRepository;
    @Autowired
    private StatusRepository statusRepository;
    @Autowired
    private RequestHistoryRepository requestHistoryRepository;

    @Override
    @Transactional
    public ServiceRequestResponseDTO createServiceRequest(ServiceRequestCreateDTO createDTO, String clientEmail) {
        
        Client client = clientRepository.findByEmail(clientEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado"));

        CategoryEquipment category = categoryRepository.findById(createDTO.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada"));

        Status openStatus = statusRepository.findByName(STATUS_ABERTA)
                .orElseThrow(() -> new ResourceNotFoundException("Status 'ABERTA' não encontrado no banco")); 

        ServiceRequest request = new ServiceRequest();
        request.setEquipmentName(createDTO.getEquipmentName());
        request.setDefectDescription(createDTO.getDefectDescription());
        request.setCategory(category);
        request.setClient(client);
        
        request.setRequestDate(LocalDateTime.now());
        request.setStatus(openStatus); 

        ServiceRequest savedRequest = serviceRequestRepository.save(request);

        // Criar entrada no histórico automaticamente
        createRequestHistory(savedRequest, client, "Solicitação criada");

        return convertToResponseDTO(savedRequest);
    }

    /**
     * Mapeador para converter a Entidade em DTO de Resposta.
     */
    private ServiceRequestResponseDTO convertToResponseDTO(ServiceRequest request) {
        ServiceRequestResponseDTO dto = new ServiceRequestResponseDTO();
        dto.setId(request.getId());
        dto.setEquipmentName(request.getEquipmentName());
        dto.setDefectDescription(request.getDefectDescription());
        dto.setRequestDate(request.getRequestDate());
        
        dto.setStatusName(request.getStatus().getName());
        dto.setStatusColor(request.getStatus().getColor());
        dto.setCategoryName(request.getCategory().getName());
        dto.setClientName(request.getClient().getName());
        
        return dto;
    }

    /**
     * Cria uma entrada no histórico da solicitação.
     */
    private void createRequestHistory(ServiceRequest request, Client client, String titulo) {
        RequestHistory history = new RequestHistory();
        history.setTitulo(titulo);
        history.setDataSolicitacao(LocalDateTime.now());
        history.setSolicitacaoId(request.getId());
        history.setUsuarioId(client.getId());
        history.setStatusId(request.getStatus().getId());
        
        requestHistoryRepository.save(history);
    }
}