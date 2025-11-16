package com.remont.back_end.service;

import com.remont.back_end.dto.ServiceRequestCreateDTO;
import com.remont.back_end.dto.ServiceRequestResponseDTO;

public interface ServiceRequestService {

    /**
     * Cria uma nova solicitação de manutenção.
     * @param createDTO Dados da solicitação.
     * @param clientEmail E-mail do cliente autenticado.
     * @return O DTO da solicitação criada.
     */
    ServiceRequestResponseDTO createServiceRequest(ServiceRequestCreateDTO createDTO, String clientEmail);
}