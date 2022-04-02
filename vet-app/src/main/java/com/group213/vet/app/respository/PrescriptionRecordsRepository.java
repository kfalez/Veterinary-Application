package com.group213.vet.app.respository;

import com.group213.vet.app.model.PrescriptionRecords;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrescriptionRecordsRepository extends JpaRepository<PrescriptionRecords, Integer> {
}
