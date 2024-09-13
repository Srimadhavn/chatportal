package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Query;
import com.example.demo.service.QueryService;
@RestController
@RequestMapping("/api")
public class QueryController {

    @Autowired
    private QueryService queryService;

    @GetMapping("/queries")
    public ResponseEntity<List<Query>> getQueries(@RequestParam String username) {
        try {
            List<Query> queries = queryService.getQueriesByStudent(username);
            return ResponseEntity.ok(queries);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/queries")
    public ResponseEntity<Void> postQuery(@RequestBody Query query, @RequestParam String username) {
        try {
            queryService.saveQuery(username, query);
            return ResponseEntity.status(201).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/other-queries")
    public ResponseEntity<List<Query>> getOtherQueries(@RequestParam String username) {
        try {
            List<Query> queries = queryService.getQueriesExcludingUser(username);
            return ResponseEntity.ok(queries);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

}
