package com.group213.vet.app.controller;

import com.group213.vet.app.model.Animal;
import com.group213.vet.app.model.AnimalStatus;
import com.group213.vet.app.service.AnimalService;
import com.group213.vet.app.service.AnimalStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/animals/status")
public class AnimalStatusController {

    @Autowired
    AnimalStatusService animalStatusService;

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ANIMAL_HEALTH_TECHNICIAN') or hasRole('ANIMAL_CARE_ATTENDANT')")
    public List<AnimalStatus> getAnimalStatus(){
        return animalStatusService.listAllAnimalStatus();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ANIMAL_HEALTH_TECHNICIAN') or hasRole('ANIMAL_CARE_ATTENDANT')")
    public ResponseEntity<AnimalStatus> getAnimalStatusById(@PathVariable Integer id){
        try {
            AnimalStatus animalStatus = animalStatusService.getAnimalStatus(id);
            return new ResponseEntity<AnimalStatus>(animalStatus, HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ANIMAL_HEALTH_TECHNICIAN') or hasRole('ANIMAL_CARE_ATTENDANT')")
    public ResponseEntity<?> addAnimalStatus(@RequestBody AnimalStatus animalStatus){
        try {
            animalStatusService.saveAnimalStatus(animalStatus);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ANIMAL_HEALTH_TECHNICIAN') or hasRole('ANIMAL_CARE_ATTENDANT')")
    public ResponseEntity<?> updateAnimalStatus(@RequestBody AnimalStatus animalStatus, @PathVariable Integer id){
        try{
            AnimalStatus existingAnimalStatus = animalStatusService.getAnimalStatus(id);
            String location = animalStatus.getLocation();
            existingAnimalStatus.setLocation(location);
            String theStatus = animalStatus.getTheStatus();
            existingAnimalStatus.setTheStatus(theStatus);
            animalStatusService.saveAnimalStatus(existingAnimalStatus);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
