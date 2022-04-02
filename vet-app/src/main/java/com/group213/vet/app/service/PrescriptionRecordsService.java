package com.group213.vet.app.service;

import com.group213.vet.app.model.PrescriptionRecords;
import com.group213.vet.app.respository.PrescriptionRecordsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PrescriptionRecordsService {

    @Autowired
    PrescriptionRecordsRepository prescriptionRecordsRepository;

    public List<PrescriptionRecords> listAllPrescriptionRecords(){
        return prescriptionRecordsRepository.findAll();
    }

    public PrescriptionRecords getPrescriptionRecordBySR(Integer scriptId){
        return prescriptionRecordsRepository.findById(scriptId).get();
    }

    public void savePrescriptionRecord(PrescriptionRecords prescriptionRecord){
        prescriptionRecordsRepository.save(prescriptionRecord);
    }

    public void deletePrescriptionRecord(Integer scriptId){
        prescriptionRecordsRepository.deleteById(scriptId);
    }
}
