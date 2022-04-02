package com.group213.vet.app.respository;

import com.group213.vet.app.model.AnimalRequests;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRequestsRepository extends JpaRepository<AnimalRequests, Integer> {
}
