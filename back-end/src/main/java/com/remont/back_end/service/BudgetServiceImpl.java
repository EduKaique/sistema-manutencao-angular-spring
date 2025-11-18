package com.remont.back_end.service;

import com.remont.back_end.dto.ServiceItemDTO;
import com.remont.back_end.exception.ResourceNotFoundException;
import com.remont.back_end.model.Budget;
import com.remont.back_end.model.BudgetService;
import com.remont.back_end.model.ServiceItem;
import com.remont.back_end.repository.BudgetRepository;
import com.remont.back_end.repository.BudgetServiceRepository;
import com.remont.back_end.repository.ServiceItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BudgetServiceImpl {

    private final BudgetRepository budgetRepository;
    private final ServiceItemRepository serviceItemRepository;
    private final BudgetServiceRepository linkRepository;

    public BudgetServiceImpl(BudgetRepository budgetRepository,
                             ServiceItemRepository serviceItemRepository,
                             BudgetServiceRepository linkRepository) {
        this.budgetRepository = budgetRepository;
        this.serviceItemRepository = serviceItemRepository;
        this.linkRepository = linkRepository;
    }

    public List<ServiceItemDTO> listServicesFromBudget(Long budgetId) {
        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new ResourceNotFoundException("Orçamento não encontrado id=" + budgetId));

        return linkRepository.findByBudget_Id(budget.getId()).stream()
                .map(BudgetService::getService)
                .map(ServiceItemDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public void addServiceToBudget(Long budgetId, Long serviceId) {
        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new ResourceNotFoundException("Orçamento não encontrado id=" + budgetId));

        ServiceItem service = serviceItemRepository.findById(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Serviço não encontrado id=" + serviceId));

        if (linkRepository.existsByBudget_IdAndService_Id(budgetId, serviceId)) {
            // já existe o vínculo, não adiciona duplicado
            return;
        }

        BudgetService link = new BudgetService(budget, service);
        linkRepository.save(link);

        recalcTotal(budgetId);
    }

    @Transactional
    public void removeServiceFromBudget(Long budgetId, Long serviceId) {
        if (!linkRepository.existsByBudget_IdAndService_Id(budgetId, serviceId)) {
            return;
        }
        linkRepository.deleteByBudget_IdAndService_Id(budgetId, serviceId);
        recalcTotal(budgetId);
    }

    @Transactional
    public void clearServicesFromBudget(Long budgetId) {
        linkRepository.deleteByBudget_Id(budgetId);
        recalcTotal(budgetId);
    }

    // Recalcula total do orçamento somando os valores dos serviços vinculados
    private void recalcTotal(Long budgetId) {
        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new ResourceNotFoundException("Orçamento não encontrado id=" + budgetId));

        BigDecimal total = linkRepository.findByBudget_Id(budgetId).stream()
                .map(BudgetService::getService)
                .map(ServiceItem::getValorServico)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        budget.setTotal(total);
        // opcional: também atualiza a string 'services' para refletir os nomes
        String servicesStr = linkRepository.findByBudget_Id(budgetId).stream()
                .map(BudgetService::getService)
                .map(ServiceItem::getNome)
                .collect(Collectors.joining(", "));
        budget.setServices(servicesStr);

        budgetRepository.save(budget);
    }
}