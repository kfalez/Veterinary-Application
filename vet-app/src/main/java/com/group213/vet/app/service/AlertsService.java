package com.group213.vet.app.service;

import com.group213.vet.app.model.Alerts;
import com.group213.vet.app.respository.AlertsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class AlertsService {

    @Autowired
    AlertsRepository alertsRepository;

    public List<Alerts> listAllAlerts(){
        return alertsRepository.findAll();
    }

    public Alerts getAlertsById(Integer alertId){
        return alertsRepository.findById(alertId).get();
    }

    public void saveAlert(Alerts alerts){
        alertsRepository.save(alerts);
    }

    public void deleteAlert(Integer alertId){
        alertsRepository.deleteById(alertId);
    }
}
