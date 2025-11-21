package com.remont.back_end.service;

import com.remont.back_end.dto.RequestHistoryDTO;
import com.remont.back_end.exception.ResourceNotFoundException;
import com.remont.back_end.model.MaintenanceRequest;
import com.remont.back_end.model.RequestHistory;
import com.remont.back_end.model.StatusEnum;
import com.remont.back_end.model.User;
import com.remont.back_end.repository.MaintenanceRequestRepository;
import com.remont.back_end.repository.RequestHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class RequestHistoryServiceImpl implements RequestHistoryService {

    @Autowired
    private RequestHistoryRepository historyRepository;

    @Autowired
    private MaintenanceRequestRepository requestRepository;

    @Override
    @Transactional
    public void addHistory(MaintenanceRequest request, User user, StatusEnum status, String title) {
        RequestHistory history = new RequestHistory(request, user, status, title);
        historyRepository.save(history);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RequestHistoryDTO> getHistoryByRequestId(Long requestId) {
        if (!requestRepository.existsById(Objects.requireNonNull(requestId))) {
            throw new ResourceNotFoundException("Solicitação não encontrada id=" + requestId);
        }

        return historyRepository.findByRequestIdOrderByOccurrenceDateAsc(requestId)
                .stream()
                .map(RequestHistoryDTO::fromEntity)
                .collect(Collectors.toList());
    }
}