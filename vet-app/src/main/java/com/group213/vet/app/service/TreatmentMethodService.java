package com.group213.vet.app.service;

import com.group213.vet.app.model.TreatmentMethod;
import com.group213.vet.app.respository.TreatmentMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class TreatmentMethodService {
    @Autowired
    private TreatmentMethodRepository treatmentMethodRepository;

    public List<TreatmentMethod> listAllTreatmentMethods(){
        return treatmentMethodRepository.findAll();
    }

    public TreatmentMethod getTreatmentMethod(Integer id){
        return treatmentMethodRepository.findById(id).get();
    }

    public void saveTreatmentMethod(TreatmentMethod treatmentMethod){
        treatmentMethodRepository.save(treatmentMethod);
    }

    public void deleteTreatmentMethod(Integer id){
        treatmentMethodRepository.deleteById(id);
    }

}
