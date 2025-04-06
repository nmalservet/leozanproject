package com.leozanproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leozanproject.model.SurveyObject;

/**
 * basic JPA repository for survey object management.
 * @author nicolas malservet
 *
 */
@Repository
public interface SurveyObjectRepository extends JpaRepository<SurveyObject, Integer> {

	public SurveyObject findByName(String name);

}
