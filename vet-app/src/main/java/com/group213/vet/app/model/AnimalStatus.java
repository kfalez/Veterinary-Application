package com.group213.vet.app.model;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "AnimalStatus")
public class AnimalStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "statusId", nullable = false)
    private int statusId;
    private int animalId;
    private String theDate;
    private String theDescription;
    private String location;
    private String theStatus;

    public AnimalStatus(int statusId, int animalId, String theDate, String theDescription,
                        String location, String theStatus) {
        this.statusId = statusId;
        this.animalId = animalId;
        this.theDate = theDate;
        this.theDescription = theDescription;
        this.location = location;
        this.theStatus = theStatus;
    }
}
