package com.leozanproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leozanproject.model.Answer;

/**
 * basic JPA repository for answer management.
 * @author nicolas malservet
 *
 */
@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer> {

	public Answer findByName(String name);

}
