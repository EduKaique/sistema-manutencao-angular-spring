package com.remont.back_end.service;

import com.remont.back_end.model.MaintenanceRecord;
import java.util.List;
import java.util.Optional;

public interface MaintenanceRecordService {

    List<MaintenanceRecord> getAllRecords();

    Optional<MaintenanceRecord> getRecordById(Long id);

    Optional<MaintenanceRecord> getRecordByRequestId(Long requestId);

    MaintenanceRecord createRecord(MaintenanceRecord MaintenanceRecord, Long requestId);

    MaintenanceRecord updateRecord(Long id, MaintenanceRecord MaintenanceRecord);

    void deleteRecord(Long id);

}
