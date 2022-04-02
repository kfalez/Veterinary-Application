package com.group213.vet.app.service;

import com.group213.vet.app.model.TheComment;
import com.group213.vet.app.respository.TheCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class TheCommentService {

    @Autowired
    private TheCommentRepository theCommentRepository;

    public List<TheComment> listAllTheComments(){
        return theCommentRepository.findAll();
    }

    public void saveTheComment(TheComment theComment){
        theCommentRepository.save(theComment);
    }

    public TheComment getTheComment(Integer id){
        return theCommentRepository.findById(id).get();
    }
    public void deleteTheComment(Integer id){
        theCommentRepository.deleteById(id);
    }
}
