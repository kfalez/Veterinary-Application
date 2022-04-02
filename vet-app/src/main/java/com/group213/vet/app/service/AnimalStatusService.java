package com.group213.vet.app.service;

import com.group213.vet.app.model.Animal;
import com.group213.vet.app.model.AnimalStatus;
import com.group213.vet.app.respository.AnimalStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class AnimalStatusService {
    @Autowired
    AnimalStatusRepository animalStatusRepository;

    public List<AnimalStatus> listAllAnimalStatus(){
        return animalStatusRepository.findAll();
    }
    public void saveAnimalStatus(AnimalStatus animalStatus){
        animalStatusRepository.save(animalStatus);
    }
    public AnimalStatus getAnimalStatus(Integer id){
        return animalStatusRepository.findById(id).get();
    }
    public void deleteAnimalStatus(Integer id){
        animalStatusRepository.deleteById(id);
    }

}
