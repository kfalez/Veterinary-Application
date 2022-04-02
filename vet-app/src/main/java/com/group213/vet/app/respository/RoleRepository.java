package com.group213.vet.app.respository;

import java.util.Optional;

import com.group213.vet.app.model.UserTypes;
import com.group213.vet.app.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(UserTypes name);


}