package com.leozanproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leozanproject.model.Question;

/**
 * basic JPA repository for question management.
 * @author nicolas malservet
 *
 */
@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {

	public Question findByName(String name);

}
