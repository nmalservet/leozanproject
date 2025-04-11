package com.leozanproject.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leozanproject.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {

	Project findByNameIgnoreCase(String projectName);
	
	List<Project> findByResponsible(int responsible, Sort sort);
	
	List<Project> findByDisabled(boolean disabled, Sort sort);
	

}
