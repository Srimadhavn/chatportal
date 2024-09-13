package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Query;
import com.example.demo.repository.QueryRepository;

@Service
public class QueryService {

    @Autowired
    private QueryRepository queryRepository;

    public List<Query> getQueriesByStudent(String username) {
        return queryRepository.findByUsername(username);
    }

    public List<Query> getQueriesExcludingUser(String username) {
        return queryRepository.findByUsernameNot(username);
    }

    public List<Query> getAllQueries() {
        return queryRepository.findAll();
    }

    public void saveQuery(String username, Query query) {
        query.setUsername(username);
        query.setTimestamp(LocalDateTime.now());
        queryRepository.save(query);
    }
}
