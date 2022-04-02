package com.group213.vet.app.controller;

import com.group213.vet.app.model.User;
import com.group213.vet.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {

        @Autowired
        UserService userService;

        @Autowired
        PasswordEncoder encoder;

        @GetMapping("")
        @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHING_TECHNICIAN')")
        public List<User> getUser(){
            return userService.listAllUser();
        }

        @GetMapping("/{id}")
        @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHING_TECHNICIAN')")
        public ResponseEntity<User> getUserById(@PathVariable Integer id){
            try {
                User user = userService.getUser(id);
                return new ResponseEntity<User>(user, HttpStatus.OK);
            }catch (NoSuchElementException e){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @PostMapping("")
        @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHING_TECHNICIAN')")
        public ResponseEntity<?> addUser(@RequestBody User user){
            try {
                userService.saveUser(user);
                return new ResponseEntity<>(HttpStatus.CREATED);
            }catch(Exception e){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }

        @PatchMapping("/{id}")
        @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHING_TECHNICIAN')")
        public ResponseEntity<?> updateUser(@RequestBody User user, @PathVariable Integer id){
            try{
                User existingUser = userService.getUser(id);

                boolean status = user.isActive();
                existingUser.setActive(status);
                String updatedPassword;

                if(user.getPassword() != null){
                    updatedPassword = encoder.encode(user.getPassword());
                    existingUser.setPassword(updatedPassword);
                }
                userService.saveUser(existingUser);
                return new ResponseEntity<>(HttpStatus.OK);
            }catch (NoSuchElementException e){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }


        @DeleteMapping("/{id}")
        @PreAuthorize("hasRole('ADMIN')")
        public void deleteUser(@PathVariable Integer id){
            userService.deleteUser(id);
        }
}

