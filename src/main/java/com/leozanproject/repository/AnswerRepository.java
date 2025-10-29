package com.leozanproject.repository;

import java.util.List;
import java.util.Optional;

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

	
	/**
	 * the answer mustr be unique for a question on a survey answer.
	 * @param surveyAnswerId
	 * @param questionId
	 * @return
	 */
	public Optional<Answer>  findBySurveyAnswerIdAndSurveyObjectId(int surveyAnswerId,int surveyObjectId);

	/**
	 * find all answers related to a response on a survey
	 * @param id
	 * @return
	 */
	public List<Answer> findBySurveyAnswerId(int surveyAnswerId);

}
