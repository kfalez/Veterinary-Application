package com.group213.vet.app.model;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name = "TheComment")
public class TheComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "commentId", nullable= false)
    private int commentId;
    private int userId;
    private int animalId;
    private String theDescription;
    private String username;


    public TheComment(int commentId, int userId, int animalId, String theDescription, String username) {
        this.commentId = commentId;
        this.username = username;
        this.userId = userId;
        this.animalId = animalId;
        this.theDescription = theDescription;
    }
    public int getCommentId() {
        return commentId;
    }

}
