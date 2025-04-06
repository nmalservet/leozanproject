package com.leozanproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leozanproject.model.Survey;

/**
 * basic JPA repository for survey management.
 * @author nicolas malservet
 *
 */
@Repository
public interface SurveyRepository extends JpaRepository<Survey, Integer> {

	public Survey findByName(String name);

}
