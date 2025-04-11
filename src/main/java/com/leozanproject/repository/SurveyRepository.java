package com.leozanproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.leozanproject.model.Survey;

/**
 * basic JPA repository for survey management.
 * @author nicolas malservet
 *
 */
@Repository
public interface SurveyRepository extends JpaRepository<Survey, Integer>, JpaSpecificationExecutor<Survey> {

	public Survey findByName(String name);
	
	public List<Survey> findByProject(Integer projectId);

}
