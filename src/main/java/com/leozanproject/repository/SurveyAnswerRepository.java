package com.leozanproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leozanproject.model.SurveyAnswer;

/**
 * basic JPA repository for survey answer management.
 * @author nicolas malservet
 *
 */
@Repository
public interface SurveyAnswerRepository extends JpaRepository<SurveyAnswer, Integer> {

	public List<SurveyAnswer> findAllByOrderByIdDesc();

	

}
