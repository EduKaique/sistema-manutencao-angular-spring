//package com.remont.back_end.repository;

//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//import com.remont.back_end.model.MaintenanceRequest;

//@Repository
//public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequest, Long> {
//}

package com.remont.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.remont.back_end.model.MaintenanceRequest;

import java.util.List;
import java.util.Optional;

@Repository
public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequest, Long> {

    // Busca por descrição exata
    List<MaintenanceRequest> findByMaintenanceDesc(String maintenanceDesc);

    // Busca contendo parte do texto
    List<MaintenanceRequest> findByMaintenanceDescContainingIgnoreCase(String partialText);

    // Busca por orientação ao cliente
    List<MaintenanceRequest> findByGuidanceClient(String guidanceClient);

    // Busca por ID do request (campo requestId)
    List<MaintenanceRequest> findByRequestId(Long requestId);

    // Verifica se existe por descrição
    boolean existsByMaintenanceDesc(String maintenanceDesc);

    // Busca opcional por descrição
    Optional<MaintenanceRequest> findFirstByMaintenanceDesc(String maintenanceDesc);

    // Ordenações comuns
    List<MaintenanceRequest> findAllByOrderByIdAsc();
    List<MaintenanceRequest> findAllByOrderByIdDesc();

    // Buscar por vários IDs
    List<MaintenanceRequest> findByIdIn(List<Long> ids);

    // Buscar por descrição e orientação
    List<MaintenanceRequest> findByMaintenanceDescAndGuidanceClient(
            String maintenanceDesc,
            String guidanceClient
    );

    // Buscar por descrição ou orientação
    List<MaintenanceRequest> findByMaintenanceDescOrGuidanceClient(
            String maintenanceDesc,
            String guidanceClient
    );

    // Buscar registros que NÃO tenham orientação ao cliente
    List<MaintenanceRequest> findByGuidanceClientIsNull();

    // Buscar registros que tenham orientação ao cliente
    List<MaintenanceRequest> findByGuidanceClientIsNotNull();

    // Buscar por requestId maior que X
    List<MaintenanceRequest> findByRequestIdGreaterThan(Long value);

    // Buscar por requestId menor que X
    List<MaintenanceRequest> findByRequestIdLessThan(Long value);

    // Buscar tudo por ordem alfabética da descrição
    List<MaintenanceRequest> findAllByOrderByMaintenanceDescAsc();

    // Buscar a primeira requisição por order ID
    Optional<MaintenanceRequest> findTopByOrderByIdDesc();

    // Contadores
    long countByRequestId(Long requestId);

    long countByGuidanceClientIsNotNull();

    // Deleções automáticas
    void deleteByRequestId(Long requestId);

    void deleteByMaintenanceDesc(String desc);

    // Atualização indireta via busca (ex.: uso em service)
    Optional<MaintenanceRequest> findByIdAndRequestId(Long id, Long requestId);

    // Limitar retornos
    List<MaintenanceRequest> findTop5ByOrderByIdDesc();

    List<MaintenanceRequest> findTop10ByMaintenanceDescContainingIgnoreCase(String text);

    // Buscar por múltiplos critérios combinados
    List<MaintenanceRequest> findByRequestIdAndGuidanceClientIsNotNull(Long requestId);

    // Buscar por requestId e termo na descrição
    List<MaintenanceRequest> findByRequestIdAndMaintenanceDescContainingIgnoreCase(
            Long requestId,
            String text
    );
}


