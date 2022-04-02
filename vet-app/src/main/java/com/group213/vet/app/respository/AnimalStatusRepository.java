package com.group213.vet.app.respository;

import com.group213.vet.app.model.Animal;
import com.group213.vet.app.model.AnimalStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalStatusRepository  extends JpaRepository<AnimalStatus, Integer> {
}
