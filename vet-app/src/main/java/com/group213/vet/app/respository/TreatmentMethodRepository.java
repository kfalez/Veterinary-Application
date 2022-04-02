package com.group213.vet.app.respository;

import com.group213.vet.app.model.TreatmentMethod;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreatmentMethodRepository extends JpaRepository<TreatmentMethod, Integer> {
}
