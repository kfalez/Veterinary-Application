package com.group213.vet.app.controller;

import com.group213.vet.app.model.Animal;
import com.group213.vet.app.model.TheComment;
import com.group213.vet.app.service.TheCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/animals/comments")
public class TheCommentController {

    @Autowired
    TheCommentService theCommentService;

    @GetMapping("")
    @PreAuthorize("hasRole('USER') or hasRole('TEACHING_TECHNICIAN') or hasRole('STUDENT')" +
            " or hasRole('ADMIN') or hasRole('ANIMAL_HEALTH_TECHNICIAN') or hasRole('ANIMAL_CARE_ATTENDANT')")
    public List<TheComment> getTheComment() { return theCommentService.listAllTheComments(); }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('TEACHING_TECHNICIAN') or hasRole('STUDENT')" +
            " or hasRole('ADMIN') or hasRole('ANIMAL_HEALTH_TECHNICIAN') or hasRole('ANIMAL_CARE_ATTENDANT')")
    public ResponseEntity<TheComment> getTheCommentById(@PathVariable Integer id){
        try {
            TheComment theComment = theCommentService.getTheComment(id);
            return new ResponseEntity<TheComment>(theComment, HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    @PreAuthorize("hasRole('STUDENT') or hasRole('ANIMAL_HEALTH_TECHNICIAN') or hasRole('ANIMAL_CARE_ATTENDANT') or hasRole('TEACHING_TECHNICIAN')")
    public ResponseEntity<?> addTheComment(@RequestBody TheComment theComment){
        try {
            theCommentService.saveTheComment(theComment);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('STUDENT') or hasRole('ANIMAL_HEALTH_TECHNICIAN') or hasRole('ANIMAL_CARE_ATTENDANT')")
    public ResponseEntity<?> updateTheComment(@RequestBody TheComment theComment, @PathVariable Integer id){
        try{
            TheComment existingComment = theCommentService.getTheComment(id);
           theComment.setCommentId(id);
            theCommentService.saveTheComment(theComment);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteTheComment(@PathVariable Integer id){
        theCommentService.deleteTheComment(id);
    }
}

