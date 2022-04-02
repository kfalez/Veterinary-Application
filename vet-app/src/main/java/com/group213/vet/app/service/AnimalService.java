package com.group213.vet.app.service;

import com.group213.vet.app.model.Animal;
import com.group213.vet.app.respository.AnimalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@Service
@Transactional
public class AnimalService {
    @Autowired
    private AnimalRepository animalRepository;

    public List<Animal> listAllAnimal(){
        return animalRepository.findAll();
    }
    public void saveAnimal(Animal animal){
        animalRepository.save(animal);
    }
    public Animal getAnimal(Integer id){
        return animalRepository.findById(id).get();
    }
    public void deleteAnimal(Integer id){
        animalRepository.deleteById(id);
    }
}