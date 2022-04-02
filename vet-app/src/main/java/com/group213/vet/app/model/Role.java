package com.group213.vet.app.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('ROLE_USER',\n" +
            "    'ROLE_ADMIN',\n" +
            "    'ROLE_TEACHING_TECHNICIAN',\n" +
            "    'ROLE_ANIMAL_HEALTH_TECHNICIAN',\n" +
            "    'ROLE_STUDENT',\n" +
            "    ROLE_ANIMAL_CARE_ATTENDANT)")
    private UserTypes name;
}

