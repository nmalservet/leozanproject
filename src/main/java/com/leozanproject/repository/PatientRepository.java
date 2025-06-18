package com.leozanproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leozanproject.model.Patient;

/**
 * basic JPA repository for answer management.
 * @author nicolas malservet
 *
 */
@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {

	List<Patient> findByName(String name);

}
