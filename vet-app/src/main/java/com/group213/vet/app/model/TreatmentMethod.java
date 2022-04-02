package com.group213.vet.app.model;

import lombok.*;

import javax.persistence.*;

@Data
@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(name = "TreatmentMethod")
public class TreatmentMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int treatmentId;
    private String theType;
}
