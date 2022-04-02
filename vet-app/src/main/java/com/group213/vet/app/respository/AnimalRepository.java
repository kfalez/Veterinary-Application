package com.group213.vet.app.respository;

import com.group213.vet.app.model.Animal;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository
        extends JpaRepository<Animal, Integer> {

}
