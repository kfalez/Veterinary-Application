package com.group213.vet.app.service;

import com.group213.vet.app.model.AnimalRequests;
import com.group213.vet.app.model.AnimalStatus;
import com.group213.vet.app.respository.AnimalRequestsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class AnimalRequestsService {

    @Autowired
    AnimalRequestsRepository animalRequestsRepository;

    public List<AnimalRequests> listAllAnimalRequests(){
        return animalRequestsRepository.findAll();
    }
    public void saveAnimalRequests(AnimalRequests animalRequests){
        animalRequestsRepository.save(animalRequests);
    }
    public AnimalRequests getAnimalRequests(Integer id){
        return animalRequestsRepository.findById(id).get();
    }
    public void deleteAnimalRequests(Integer id){
        animalRequestsRepository.deleteById(id);
    }
}
