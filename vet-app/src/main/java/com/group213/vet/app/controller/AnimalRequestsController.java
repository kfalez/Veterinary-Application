package com.group213.vet.app.controller;

import com.group213.vet.app.model.AnimalRequests;
import com.group213.vet.app.model.AnimalStatus;
import com.group213.vet.app.service.AnimalRequestsService;
import com.group213.vet.app.service.AnimalStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(path = "/animals/requests")
public class AnimalRequestsController {

    @Autowired
    AnimalRequestsService animalRequestsService;

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ANIMAL_HEALTH_TECHNICIAN') or hasRole('ANIMAL_CARE_ATTENDANT')")
    public List<AnimalRequests> getAnimalRequests(){
        return animalRequestsService.listAllAnimalRequests();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ANIMAL_HEALTH_TECHNICIAN') or hasRole('ANIMAL_CARE_ATTENDANT')")
    public ResponseEntity<AnimalRequests> getAnimalRequestsById(@PathVariable Integer id){
        try {
            AnimalRequests animalRequests = animalRequestsService.getAnimalRequests(id);
            return new ResponseEntity<AnimalRequests>(animalRequests, HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ANIMAL_HEALTH_TECHNICIAN') or hasRole('ANIMAL_CARE_ATTENDANT')")
    public ResponseEntity<?> addAnimalRequests(@RequestBody AnimalRequests animalRequests){
        try {
            animalRequestsService.saveAnimalRequests(animalRequests);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ANIMAL_HEALTH_TECHNICIAN') or hasRole('ANIMAL_CARE_ATTENDANT')")
    public ResponseEntity<?> updateAnimalRequests(@RequestBody AnimalRequests animalRequests, @PathVariable Integer id){
        try{
            AnimalRequests existingAnimalRequests = animalRequestsService.getAnimalRequests(id);
            animalRequests.setAnimalId(id);
            animalRequestsService.saveAnimalRequests(animalRequests);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
