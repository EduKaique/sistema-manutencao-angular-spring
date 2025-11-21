package com.remont.back_end.service;

import com.remont.back_end.dto.RequestHistoryDTO;
import com.remont.back_end.model.MaintenanceRequest;
import com.remont.back_end.model.StatusEnum;
import com.remont.back_end.model.User;

import java.util.List;

public interface RequestHistoryService {

    void addHistory(MaintenanceRequest request, User user, StatusEnum status, String title);

    List<RequestHistoryDTO> getHistoryByRequestId(Long requestId);
}