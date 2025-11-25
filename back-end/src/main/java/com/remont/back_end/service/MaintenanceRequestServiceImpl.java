package com.remont.back_end.service;

import com.remont.back_end.dto.BudgetDTO;
import com.remont.back_end.dto.ClientRequestDetailDTO;
import com.remont.back_end.dto.EmployeeRequestDetailDTO;
import com.remont.back_end.dto.MaintenanceRecordDTO;
import com.remont.back_end.dto.RejectionDTO;
import com.remont.back_end.dto.RequestHistoryDTO;
import com.remont.back_end.dto.MaintenanceRequestCreateDTO;
import com.remont.back_end.dto.MaintenanceRequestResponseDTO;
import com.remont.back_end.exception.ResourceNotFoundException;
import com.remont.back_end.model.*;
import com.remont.back_end.repository.CategoryEquipmentRepository;
import com.remont.back_end.repository.ClientRepository;
import com.remont.back_end.repository.EmployeeRepository;
import com.remont.back_end.repository.MaintenanceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class MaintenanceRequestServiceImpl implements MaintenanceRequestService {

    @Autowired
    private MaintenanceRequestRepository maintenanceRequestRepository;

    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private RequestHistoryService historyService;
    @Autowired
    private CategoryEquipmentRepository categoryRepository;
    @Autowired
    private BudgetService budgetService; 
    @Autowired
    private MaintenanceRecordService maintenanceRecordService;

    /**
     * Nova Solicitação de Manutenção
     */
    @Override
    public MaintenanceRequestResponseDTO createMaintenanceRequest(MaintenanceRequestCreateDTO createDTO, Long clientId) {
        Client client = clientRepository.findById(Objects.requireNonNull(clientId))
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado"));

        CategoryEquipment category = categoryRepository.findById(createDTO.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada"));
                    

        MaintenanceRequest request = new MaintenanceRequest();
        request.setEquipmentName(createDTO.getEquipmentName());
        request.setDefectDescription(createDTO.getDefectDescription());
        request.setCategory(category);
        request.setClient(client);
        request.setRequestDate(LocalDateTime.now());
        request.setStatus(StatusEnum.ABERTA);


        MaintenanceRequest savedRequest = maintenanceRequestRepository.save(request);
        historyService.addHistory(savedRequest, client, StatusEnum.ABERTA, "Solicitação Aberta");
        return convertToResponseDTO(savedRequest);
    }

    /**
     * Listar Solicitações do Cliente
     */
    @Override
    @Transactional(readOnly = true)
    public List<MaintenanceRequestResponseDTO> getRequestsForClient(Long clientId) {
        Client client = clientRepository.findById(Objects.requireNonNull(clientId))
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado"));

        return maintenanceRequestRepository.findByClientOrderByRequestDateAsc(client).stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Listar Solicitações dos Funcionário
     */
    @Override
    @Transactional(readOnly = true)
    public List<MaintenanceRequestResponseDTO> getRequestsForEmployee(String employeeEmail) {
        return maintenanceRequestRepository.findAllByOrderByRequestDateAsc().stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Listar o detalhe da solicitação (Cliente)
     */
    @Override
    @Transactional(readOnly = true)
    public ClientRequestDetailDTO getRequestDetailForClient(Long requestId, Long clientId) {
        MaintenanceRequest request = findRequestById(requestId);

        if (!request.getClient().getId().equals(clientId)) {
            throw new SecurityException("Acesso negado a esta solicitação.");
        }
        
        List<RequestHistoryDTO> historyList = historyService.getHistoryByRequestId(requestId);

        return ClientRequestDetailDTO.fromEntity(request, historyList);
    }

    /**
     * Listar o detalhe da solicitação (Funcionário)
     */
    @Override
    @Transactional(readOnly = true)
    public EmployeeRequestDetailDTO getRequestDetailForEmployee(Long requestId) {
        MaintenanceRequest request = findRequestById(requestId);

        return EmployeeRequestDetailDTO.fromEntity(request);
    }

    /**
     * Efetuar Orçamento
     */
    @Override
    @Transactional
    public MaintenanceRequestResponseDTO createBudget(Long requestId, BudgetDTO budgetDto, Long employeeId) {
        MaintenanceRequest request = findRequestById(requestId);
        Employee employee = employeeRepository.findById(Objects.requireNonNull(employeeId))
                .orElseThrow(() -> new ResourceNotFoundException("Funcionário não encontrado"));

        if (request.getStatus() != StatusEnum.ABERTA) {
            throw new IllegalStateException("A solicitação não está aberta para orçamento.");
        }

        if (request.getAssignedEmployee() == null) {
            request.setAssignedEmployee(employee);
        } else if (!request.getAssignedEmployee().getId().equals(employee.getId())) {
            throw new SecurityException("Você não é o funcionário designado para esta solicitação.");
        }

        budgetDto.setRequestId(requestId);
        budgetDto.setEmployeeId(employee.getId());
        budgetService.create(budgetDto);

        request.setStatus(StatusEnum.ORCADA);

        historyService.addHistory(request, employee, StatusEnum.ORCADA, "Orçamento efetuado");

        return convertToResponseDTO(maintenanceRequestRepository.save(request));
    }

    /**
     * Aprovar Serviço 
    */
    @Override
    @Transactional
    public MaintenanceRequestResponseDTO approveBudget(Long requestId, Long clientId) {
        MaintenanceRequest request = findRequestById(requestId);
        

        if (!request.getClient().getId().equals(clientId)) {
            throw new SecurityException("Você não tem permissão para aprovar esta solicitação.");
        }
        
        if (request.getStatus() != StatusEnum.ORCADA) {
            throw new IllegalStateException("A solicitação não está em fase de aprovação.");
        }

        request.setStatus(StatusEnum.APROVADA);

        historyService.addHistory(request, request.getClient(), StatusEnum.APROVADA, "Orçamento Aprovado ");

        return convertToResponseDTO(maintenanceRequestRepository.save(request));
    }

    /**
     * Rejeitar Serviço 
     */
    @Override
    @Transactional
    public MaintenanceRequestResponseDTO rejectBudget(Long requestId, RejectionDTO dto, Long clientId) {
        MaintenanceRequest request = findRequestById(requestId);


        if (!request.getClient().getId().equals(clientId)) {
            throw new SecurityException("Você não tem permissão para rejeitar esta solicitação.");
        }

        if (request.getStatus() != StatusEnum.ORCADA) {
            throw new IllegalStateException("A solicitação não está em fase de aprovação.");
        }

        request.setStatus(StatusEnum.REJEITADA);
        request.setRejectionReason(dto.getRejectionReason()); 

        historyService.addHistory(request, request.getClient(), StatusEnum.REJEITADA, "Orçamento Rejeitado");

        return convertToResponseDTO(maintenanceRequestRepository.save(request));
    }

    /**
     * Resgatar Serviço 
    */
    @Override
    @Transactional
    public MaintenanceRequestResponseDTO rescueRequest(Long requestId, Long clientId) {
        MaintenanceRequest request = findRequestById(requestId);


        if (!request.getClient().getId().equals(clientId)) {
            throw new SecurityException("Você não tem permissão para resgatar esta solicitação.");
        }

        if (request.getStatus() != StatusEnum.REJEITADA) {
            throw new IllegalStateException("Apenas solicitações rejeitadas podem ser resgatadas.");
        }

        request.setStatus(StatusEnum.APROVADA);
        request.setRejectionReason(null);
        
        historyService.addHistory(request, request.getClient(), StatusEnum.APROVADA, "Serviço Resgatado");

        return convertToResponseDTO(maintenanceRequestRepository.save(request));
    }

    
    /*
    * Efetuar Manutenção 
    */
    @Override
    @Transactional
    public MaintenanceRequestResponseDTO executeMaintenance(Long requestId, MaintenanceRecordDTO dto, Long employeeId) {
        MaintenanceRequest request = findRequestById(requestId);
        Employee employee = employeeRepository.findById(Objects.requireNonNull(employeeId))
                .orElseThrow(() -> new ResourceNotFoundException("Funcionário não encontrado"));


        if (request.getStatus() != StatusEnum.APROVADA) {
            throw new IllegalStateException("Solicitação não está aprovada para efetuar manutenção.");
        }

        if (request.getAssignedEmployee() == null || !request.getAssignedEmployee().getId().equals(employee.getId())) {
            throw new SecurityException("Você não é o funcionário designado para esta solicitação.");
        }

        MaintenanceRecord record = new MaintenanceRecord();
        
        record.setMaintenanceDescription(dto.getMaintenanceDescription()); 
        record.setClientGuidelines(dto.getClientGuidelines());             
        record.setFinishedAt(LocalDateTime.now()); 
        record.setEmployee(employee);           
        record.setMaintenanceRequest(request);
        maintenanceRecordService.createRecord(record);

        request.setMaintenanceRecord(record);

        request.setStatus(StatusEnum.ARRUMADA);
        request.setAssignedEmployee(employee); 

        MaintenanceRequest savedRequest = maintenanceRequestRepository.save(request);

        historyService.addHistory(savedRequest, employee, StatusEnum.ARRUMADA, "Manutenção efetuada");

        return convertToResponseDTO(savedRequest);
    }

    /*
    * Redirecionar Manutenção
    */
    @Override
    @Transactional
    public MaintenanceRequestResponseDTO redirectMaintenance(Long requestId, Long targetEmployeeId, Long employeeId) {
        
        MaintenanceRequest request = findRequestById(requestId);
        Employee redirectorEmployee = employeeRepository.findById(Objects.requireNonNull(employeeId))
                .orElseThrow(() -> new ResourceNotFoundException("Funcionário não encontrado"));
        
        Employee targetEmployee = employeeRepository.findById(Objects.requireNonNull(targetEmployeeId))
                .orElseThrow(() -> new ResourceNotFoundException("Funcionário destino não encontrado"));

        Employee currentEmployee = request.getAssignedEmployee();

        if (currentEmployee != null) {

            if (!currentEmployee.getId().equals(redirectorEmployee.getId())) {
                throw new SecurityException("Você não é o funcionário designado para esta solicitação.");
            }
            
            if (currentEmployee.getId().equals(targetEmployee.getId())) {
                throw new IllegalArgumentException("O funcionário já é o responsável por esta solicitação.");
            }
            
            request.setStatus(StatusEnum.REDIRECIONADA);
            historyService.addHistory(request, redirectorEmployee, StatusEnum.REDIRECIONADA, "Solicitação redirecionada");
        } 

        request.setAssignedEmployee(targetEmployee);

        return convertToResponseDTO(maintenanceRequestRepository.save(request));
    }

    /**
     * Pagar Serviço 
     */
    @Override
    @Transactional
    public MaintenanceRequestResponseDTO payRequest(Long requestId, Long clientId) {
        MaintenanceRequest request = findRequestById(requestId);

        if (!request.getClient().getId().equals(clientId)) {
            throw new SecurityException("Você não tem permissão para pagar esta solicitação.");
        }

        if (request.getStatus() != StatusEnum.ARRUMADA) {
            throw new IllegalStateException("O serviço precisa estar ARRUMADO para ser pago.");
        }

        request.setStatus(StatusEnum.PAGA);
        
        historyService.addHistory(request, request.getClient(), StatusEnum.PAGA, "Serviço pago");

        return convertToResponseDTO(maintenanceRequestRepository.save(request));
    }

    @Override
    @Transactional
    public MaintenanceRequestResponseDTO finalizeRequest(Long requestId, Long employeeId) {
        MaintenanceRequest request = findRequestById(requestId);
        Employee employee = employeeRepository.findById(Objects.requireNonNull(employeeId))
                .orElseThrow(() -> new ResourceNotFoundException("Funcionário não encontrado"));

        if (request.getStatus() != StatusEnum.PAGA) {
            throw new IllegalStateException("O serviço precisa estar PAGO para ser finalizado.");
        }

        request.setStatus(StatusEnum.FINALIZADA);

        historyService.addHistory(request, employee, StatusEnum.FINALIZADA, "Solicitação Finalizada");

        request.setAssignedEmployee(employee);

        return convertToResponseDTO(maintenanceRequestRepository.save(request));
    }


    private MaintenanceRequest findRequestById(Long id) {
        return maintenanceRequestRepository.findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new ResourceNotFoundException("Solicitação não encontrada id=" + id));
    }


    private MaintenanceRequestResponseDTO convertToResponseDTO(MaintenanceRequest request) {
        MaintenanceRequestResponseDTO dto = new MaintenanceRequestResponseDTO();
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
}