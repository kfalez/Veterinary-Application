package com.group213.vet.app.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "AnimalRequests")
public class AnimalRequests {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "requestId", nullable = false)
    private int requestId;
    private int userId;
    private int animalId;
    private String approvalStatus;
    private String requestStatus;

    public AnimalRequests(int requestId, int userId, int animalId, String approvalStatus, String requestStatus) {
        this.requestId = requestId;
        this.userId = userId;
        this.animalId = animalId;
        this.approvalStatus = approvalStatus;
        this.requestStatus = requestStatus;
    }
}
