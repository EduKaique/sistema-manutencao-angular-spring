    package com.remont.back_end.service;

    import com.remont.back_end.exception.ResourceNotFoundException;
    import com.remont.back_end.model.MaintenanceRecord;
    import com.remont.back_end.model.MaintenanceRequest;
    import com.remont.back_end.repository.MaintenanceRecordRepository;
    import com.remont.back_end.repository.MaintenanceRequestRepository;
    import org.springframework.stereotype.Service;
    import org.springframework.transaction.annotation.Transactional;

    import java.beans.Introspector;
    import java.beans.PropertyDescriptor;
    import java.lang.reflect.Method;
    import java.util.List;
    import java.util.Objects;
    import java.util.Optional;

    @Service
    public class MaintenanceRecordServiceImpl implements MaintenanceRecordService {

        private final MaintenanceRecordRepository maintenanceRecordRepository;
        private final MaintenanceRequestRepository maintenanceRequestRepository;

        public MaintenanceRecordServiceImpl(
                MaintenanceRecordRepository maintenanceRecordRepository,
                MaintenanceRequestRepository maintenanceRequestRepository) {
            this.maintenanceRecordRepository = maintenanceRecordRepository;
            this.maintenanceRequestRepository = maintenanceRequestRepository;
        }

        @Override
        public List<MaintenanceRecord> getAllRecords() {
            return maintenanceRecordRepository.findAll();
        }

        @Override
        public Optional<MaintenanceRecord> getRecordById(Long id) {
            return maintenanceRecordRepository.findById(Objects.requireNonNull(id) );
        }

        @Override
        public Optional<MaintenanceRecord> getRecordByRequestId(Long requestId) {
            return maintenanceRecordRepository.findAll().stream()
                    .filter(record -> record.getMaintenanceRequest() != null 
                            && record.getMaintenanceRequest().getId().equals(requestId))
                    .findFirst();
        }

        @Override
        @Transactional
        public MaintenanceRecord createRecord(MaintenanceRecord record, Long requestId) {
            MaintenanceRequest req = maintenanceRequestRepository.findById(Objects.requireNonNull(requestId))
                    .orElseThrow(() -> new ResourceNotFoundException("Request não encontrado: " + requestId));

            record.setMaintenanceRequest(req);

            return maintenanceRecordRepository.save(record);
        }


        @Override
        @Transactional
        public MaintenanceRecord updateRecord(Long id, MaintenanceRecord MaintenanceRecord) {
            return maintenanceRecordRepository.findById(Objects.requireNonNull(id))
                    .map(existing -> {
                        copyNonNullProperties(MaintenanceRecord, existing);
                        return maintenanceRecordRepository.save(Objects.requireNonNull(existing));
                    })
                    .orElseThrow(() -> new ResourceNotFoundException("MaintenanceRecord não encontrado: " + id));
        }

        @Override
        @Transactional
        public void deleteRecord(Long id) {
            if (!maintenanceRecordRepository.existsById(Objects.requireNonNull(id))) {
                throw new ResourceNotFoundException("MaintenanceRecord não encontrado: " + id);
            }
            maintenanceRecordRepository.deleteById(id);
        }

        private void copyNonNullProperties(MaintenanceRecord source, MaintenanceRecord target) {
            try {
                for (PropertyDescriptor pd : Introspector.getBeanInfo(MaintenanceRecord.class, Object.class).getPropertyDescriptors()) {
                    String name = pd.getName();
                    if ("id".equals(name)) continue; 
                    Method read = pd.getReadMethod();
                    Method write = pd.getWriteMethod();
                    if (read == null || write == null) continue;
                    Object value = read.invoke(source);
                    if (value != null) {
                        write.invoke(target, value);
                    }
                }
            } catch (Exception e) {
                throw new RuntimeException("Erro ao copiar as informalções da Manutenção", e);
            }
        }
    }