package com.group213.vet.app.respository;

import com.group213.vet.app.model.AnimalPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalPhotoRepository  extends JpaRepository<AnimalPhoto, Integer> {
}
