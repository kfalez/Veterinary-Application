package com.group213.vet.app.service;

import com.group213.vet.app.model.AnimalPhoto;
import com.group213.vet.app.respository.AnimalPhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class AnimalPhotoService {
    @Autowired
    AnimalPhotoRepository animalPhotoRepository;

    public List<AnimalPhoto> listAllAnimalPhoto(){
        return animalPhotoRepository.findAll();
    }
    public void saveAnimalPhoto(AnimalPhoto animalPhoto){
        animalPhotoRepository.save(animalPhoto);
    }
    public AnimalPhoto getAnimalPhoto(Integer id){
        return animalPhotoRepository.findById(id).get();
    }
    public void deleteAnimalPhoto(Integer id){
        animalPhotoRepository.deleteById(id);
    }

}
