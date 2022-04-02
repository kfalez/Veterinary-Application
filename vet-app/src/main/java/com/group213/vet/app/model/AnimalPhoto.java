package com.group213.vet.app.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Images")
public class AnimalPhoto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "imageId", nullable = false)
    private int imageId;
    private int userId;
    private String creationDate;
    private String theFile;
    private int animalId;
    private String theType;


}

