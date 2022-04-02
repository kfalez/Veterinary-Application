package com.group213.vet.app.model;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@Entity // Annotate the class is an entity in the database
@Table(	name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")

        }) //Annotate the name of the table in the database
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Size(max = 20)
    private String username;

    private boolean active;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(max = 120)
    private String password;

//    @NotBlank
    @Size(max = 120)
    private String activationDate;



    public User(String username, boolean active, String email, String password, String activationDate) {
        this.username = username;
        this.active=active;
        this.email = email;
        this.password = password;
        this.activationDate = activationDate;
    }

    @OneToMany(targetEntity = PrescriptionRecords.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private List<PrescriptionRecords> prescriptionRecords;

    @OneToMany (targetEntity = TheComment.class, cascade=CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private List<TheComment> theComment;

    @OneToMany(targetEntity = AnimalPhoto.class, cascade=CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private List<AnimalPhoto> animalPhoto;

    @OneToMany(targetEntity = AnimalRequests.class, cascade=CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private List<AnimalRequests> animalRequests;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
}


