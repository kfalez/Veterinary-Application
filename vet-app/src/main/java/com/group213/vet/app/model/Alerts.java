package com.group213.vet.app.model;


import lombok.*;
import org.hibernate.annotations.Synchronize;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@Getter @Setter @NoArgsConstructor
@Table(name= "Alerts")
public class Alerts implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int alertId;
    private int userId;
    private int animalId;
    private String priority;
    private String message;
    private String location;

    public Alerts(int alertId, int animalId, String priority,
                  String message, String location) {
        this.alertId = alertId;
        this.animalId = animalId;
        this.priority = priority;
        this.message = message;
        this.location = location;

    }
}
