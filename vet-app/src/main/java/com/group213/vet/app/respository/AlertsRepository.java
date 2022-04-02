package com.group213.vet.app.respository;

import com.group213.vet.app.model.Alerts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertsRepository extends JpaRepository<Alerts, Integer> {
}
