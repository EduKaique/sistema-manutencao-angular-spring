package com.remont.back_end.service;

import com.remont.back_end.exception.ResourceNotFoundException;
import com.remont.back_end.model.MaintenanceRecord;
import com.remont.back_end.repository.MaintenanceRecordRepository;
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

    public MaintenanceRecordServiceImpl(MaintenanceRecordRepository maintenanceRecordRepository) {
        this.maintenanceRecordRepository = maintenanceRecordRepository;
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
    @Transactional
    public MaintenanceRecord createRecord(MaintenanceRecord MaintenanceRecord) {
        return maintenanceRecordRepository.save(Objects.requireNonNull(MaintenanceRecord));
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