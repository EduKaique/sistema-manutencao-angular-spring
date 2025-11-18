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

}


