package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Query;

public interface QueryRepository extends JpaRepository<Query, Long> {
    List<Query> findBySubjectCode(String subjectCode);
    List<Query> findByUsername(String username);
    List<Query> findByUsernameNot(String username);

}
