package com.group213.vet.app.controller;


import com.group213.vet.app.model.Alerts;
import com.group213.vet.app.service.AlertsService;
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
@RequestMapping(path = "/animals/alerts")
public class AlertsController {

    @Autowired
    AlertsService alertsService;

    @GetMapping("")
    @PreAuthorize("hasRole('ANIMAL_HEALTH_TECHNICIAN')")
    public List<Alerts> getAlerts(){
        return alertsService.listAllAlerts();
    }

    @GetMapping("/{alertId}")
    @PreAuthorize("hasRole('ANIMAL_HEALTH_TECHNICIAN')")
    public ResponseEntity<Alerts> getAlertsById(@PathVariable Integer alertId){
        try {
            Alerts alerts = alertsService.getAlertsById(alertId);
            return new ResponseEntity<>(alerts, HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{alertId}")
    @PreAuthorize("hasRole('ANIMAL_HEALTH_TECHNICIAN')")
    public ResponseEntity<?> updateAlert(@RequestBody Alerts alert, @PathVariable Integer alertId) {
        try {
            Alerts alerts = alertsService.getAlertsById(alertId);
            alerts.setAlertId(alertId);
            alertsService.saveAlert(alerts);
            return new ResponseEntity<>(alerts, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ANIMAL_HEALTH_TECHNICIAN') or hasRole('ANIMAL_CARE_ATTENDANT')")
    public ResponseEntity<?> addAlert(@RequestBody Alerts alerts){
        try {
            alertsService.saveAlert(alerts);
            return new ResponseEntity<>(alerts, HttpStatus.CREATED);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{alertId}")
    @PreAuthorize("hasRole('ANIMAL_HEALTH_TECHNICIAN')")
    public ResponseEntity<?> removeAlert(@PathVariable Integer alertId){
        try{
           alertsService.deleteAlert(alertId);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}