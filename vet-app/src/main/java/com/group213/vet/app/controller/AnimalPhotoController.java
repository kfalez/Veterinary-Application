package com.group213.vet.app.controller;

import com.group213.vet.app.model.AnimalPhoto;
import com.group213.vet.app.model.AnimalStatus;
import com.group213.vet.app.service.AnimalPhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/animals/photos")
public class AnimalPhotoController {

    @Autowired
    AnimalPhotoService animalPhotoService;

    @GetMapping("")
    @PreAuthorize("hasRole('USER') or hasRole('TEACHING_TECHNICIAN') or hasRole('STUDENT')" +
            " or hasRole('ADMIN') or hasRole('ANIMAL_HEALTH_TECHNICIAN') or hasRole('ANIMAL_CARE_ATTENDANT')")
    public List<AnimalPhoto> getAnimalPhoto(){
        return animalPhotoService.listAllAnimalPhoto();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('TEACHING_TECHNICIAN') or hasRole('STUDENT')" +
            " or hasRole('ADMIN') or hasRole('ANIMAL_HEALTH_TECHNICIAN') or hasRole('ANIMAL_CARE_ATTENDANT')")
    public ResponseEntity<AnimalPhoto> getAnimalPhotoById(@PathVariable Integer id){
        try {
            AnimalPhoto animalPhoto = animalPhotoService.getAnimalPhoto(id);
            return new ResponseEntity<AnimalPhoto>(animalPhoto, HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ANIMAL_CARE_ATTENDANT')")
    public ResponseEntity<?> addAnimalPhoto(@RequestBody AnimalPhoto animalPhoto){
        try {
            animalPhotoService.saveAnimalPhoto(animalPhoto);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ANIMAL_CARE_ATTENDANT')")
    public ResponseEntity<?> updateAnimalPhoto(@RequestBody AnimalPhoto animalPhoto, @PathVariable Integer id){
        try{
            AnimalPhoto existingAnimalPhoto = animalPhotoService.getAnimalPhoto(id);
            animalPhoto.setAnimalId(id);
            animalPhotoService.saveAnimalPhoto(animalPhoto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> removePhoto(@PathVariable Integer id){
        try{
            animalPhotoService.deleteAnimalPhoto(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch(EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
