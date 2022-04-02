package com.group213.vet.app.model;

import lombok.*;
import org.hibernate.annotations.Synchronize;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@Getter @Setter @NoArgsConstructor
@Table(name= "PrescriptionRecords")
public class PrescriptionRecords implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scriptRecord;
    private int userId;
    private int animalId;
    private String theDate;
    private String instructions;
    private String drugId;
    private String dosage;
    private String deliveryMethod;
    private String drugName;
    private int treatmentMethodId;

    public PrescriptionRecords(int scriptRecord, int animalId, String theDate,
                               String instructions, String drugId, String dosage,
                               String deliveryMethod, String drugName, int treatmentMethodId)
    {
        this.scriptRecord = scriptRecord;
        this.animalId = animalId;
        this.theDate = theDate;
        this.instructions = instructions;
        this.drugId = drugId;
        this.dosage = dosage;
        this.deliveryMethod = deliveryMethod;
        this.drugName = drugName;
        this.treatmentMethodId = treatmentMethodId;
    }


    @OneToMany(targetEntity = TreatmentMethod.class)
    @JoinColumn(name = "treatmentId", referencedColumnName = "treatmentMethodId")
    private  List<TreatmentMethod> treatmentMethodList;
}
