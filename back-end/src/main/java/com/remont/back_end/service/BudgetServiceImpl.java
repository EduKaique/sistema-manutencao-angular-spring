package com.remont.back_end.service;

import com.remont.back_end.dto.BudgetDTO;
import com.remont.back_end.dto.ServiceItemDTO;
import com.remont.back_end.exception.ResourceNotFoundException;
import com.remont.back_end.model.Budget;
import com.remont.back_end.model.MaintenanceRequest;
import com.remont.back_end.model.ServiceItem;
import com.remont.back_end.repository.BudgetRepository;
import com.remont.back_end.repository.BudgetServiceRepository;
import com.remont.back_end.repository.MaintenanceRequestRepository;
import com.remont.back_end.repository.ServiceItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BudgetServiceImpl implements BudgetService {

    private final BudgetRepository budgetRepository;
    private final ServiceItemRepository serviceItemRepository;
    private final BudgetServiceRepository linkRepository;
    private final MaintenanceRequestRepository maintenanceRequestRepository;

    public BudgetServiceImpl(BudgetRepository budgetRepository,
                             ServiceItemRepository serviceItemRepository,
                             BudgetServiceRepository linkRepository,
                             MaintenanceRequestRepository maintenanceRequestRepository) {
        this.budgetRepository = budgetRepository;
        this.serviceItemRepository = serviceItemRepository;
        this.linkRepository = linkRepository;
        this.maintenanceRequestRepository = maintenanceRequestRepository;
    }

    @Override
    public List<Budget> findAll() {
        return budgetRepository.findAll();
    }

    @Override
    public Optional<Budget> findById(Long id) {
        return budgetRepository.findById(Objects.requireNonNull(id));
    }

    @Override
    public List<Budget> findByRequestId(Long requestId) {
        return budgetRepository.findByMaintenanceRequest_Id(requestId);
    }

    @Override
    @Transactional
    public Budget create(BudgetDTO dto) {
        MaintenanceRequest request = maintenanceRequestRepository.findById(Objects.requireNonNull(dto.getRequestId()))
                .orElseThrow(() -> new ResourceNotFoundException("Solicitação não encontrada id=" + dto.getRequestId()));

        Budget budget = new Budget();
        budget.setMaintenanceRequest(request);
        budget.setEmployeeId(dto.getEmployeeId());
        
        budget.setTotal(BigDecimal.ZERO); 
        budget.setServicesDescription(""); 

        Budget savedBudget = budgetRepository.save(budget);

        if (dto.getServiceIds() != null && !dto.getServiceIds().isEmpty()) {
            for (Long serviceId : dto.getServiceIds()) {
                this.addServiceToBudget(savedBudget.getId(), serviceId);
            }
        }
        
        return budgetRepository.findById(Objects.requireNonNull(savedBudget.getId())).get();
    }

    @Override
    @Transactional
    public Budget update(Long id, BudgetDTO dto) {
        Budget budget = budgetRepository.findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new ResourceNotFoundException("Orçamento não encontrado id=" + id));

        if(dto.getEmployeeId() != null) {
            budget.setEmployeeId(dto.getEmployeeId());
        }
        
        return budgetRepository.save(Objects.requireNonNull(budget));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!budgetRepository.existsById(Objects.requireNonNull(id))) {
            throw new ResourceNotFoundException("Orçamento não encontrado id=" + id);
        }
        budgetRepository.deleteById(id);
    }


    @Override
    public List<ServiceItemDTO> listServicesFromBudget(Long budgetId) {
        if (!budgetRepository.existsById(Objects.requireNonNull(budgetId))) {
            throw new ResourceNotFoundException("Orçamento não encontrado id=" + budgetId);
        }

        List<com.remont.back_end.model.BudgetService> links = linkRepository.findByBudget_Id(budgetId);

        return links.stream()
                .map(link -> {
                    ServiceItem item = link.getServiceItem();
                    return new ServiceItemDTO(item.getId(), item.getNome(), item.getValorServico());
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void addServiceToBudget(Long budgetId, Long serviceId) {
        Budget budget = budgetRepository.findById(Objects.requireNonNull(budgetId))
                .orElseThrow(() -> new ResourceNotFoundException("Orçamento não encontrado id=" + budgetId));

        ServiceItem serviceItem = serviceItemRepository.findById(Objects.requireNonNull(serviceId))
                .orElseThrow(() -> new ResourceNotFoundException("Serviço não encontrado id=" + serviceId));

        if (linkRepository.existsByBudgetAndServiceItem(budget, serviceItem)) {
            return; 
        }

        com.remont.back_end.model.BudgetService link = new com.remont.back_end.model.BudgetService(serviceItem, budget);
        linkRepository.save(link);

        recalcTotal(budget);
    }

    @Override
    @Transactional
    public void removeServiceFromBudget(Long budgetId, Long serviceId) {
        Budget budget = budgetRepository.findById(Objects.requireNonNull(budgetId))
                .orElseThrow(() -> new ResourceNotFoundException("Orçamento não encontrado id=" + budgetId));
        
        ServiceItem serviceItem = serviceItemRepository.findById(Objects.requireNonNull(serviceId))
                .orElseThrow(() -> new ResourceNotFoundException("Serviço não encontrado id=" + serviceId));

        if (linkRepository.existsByBudgetAndServiceItem(budget, serviceItem)) {
            linkRepository.deleteByBudgetAndServiceItem(budget, serviceItem);
            recalcTotal(budget);
        }
    }

    private void recalcTotal(Budget budget) {
        List<com.remont.back_end.model.BudgetService> items = linkRepository.findByBudget_Id(budget.getId());

        BigDecimal total = items.stream()
                .map(link -> link.getServiceItem().getValorServico())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        String description = items.stream()
                .map(link -> link.getServiceItem().getNome())
                .collect(Collectors.joining(", "));

        budget.setTotal(total);
        budget.setServicesDescription(description); 

        budgetRepository.save(budget);
    }
}