package com.remont.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.remont.back_end.model.MaintenanceRecord;


@Repository
public interface MaintenanceRecordRepository extends JpaRepository<MaintenanceRecord, Long> {

}


