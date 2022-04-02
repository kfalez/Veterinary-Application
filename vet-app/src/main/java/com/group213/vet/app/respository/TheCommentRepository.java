package com.group213.vet.app.respository;

import com.group213.vet.app.model.TheComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TheCommentRepository extends JpaRepository<TheComment, Integer> {

}

