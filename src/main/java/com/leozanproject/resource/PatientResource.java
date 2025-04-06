package com.leozanproject.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.leozanproject.exceptions.InvalidParameterException;
import com.leozanproject.exceptions.MissingParameterException;
import com.leozanproject.resource.domain.PatientDTO;
import com.leozanproject.service.PatientService;

/**
 * REST API for patients
 * @author nicolas malservet
 *
 */
@RestController
@Validated
@RequestMapping("/api/v1/patients")
public class PatientResource {
	
	@Autowired
	PatientService service;
	

	@GetMapping(path = "", produces = "application/json")
	public List<PatientDTO> list(){
		return service.list();
	}
	
	@PostMapping(path = "", produces = "application/json")
	@ResponseStatus(HttpStatus.CREATED)
	public boolean createPatient(@RequestBody PatientDTO dto) throws MissingParameterException {
		return service.createPatient(dto);
	}
	
	@PutMapping(path = "", produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public boolean updatePatient(@RequestBody PatientDTO dto) throws MissingParameterException, InvalidParameterException {
		return service.updatePatient(dto);
	}
	@GetMapping(path = "/{id}", produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public PatientDTO getPatient(@PathVariable int id) throws MissingParameterException, InvalidParameterException {
		return service.getPatient(id);
	}
	
	
	@DeleteMapping(path = "/{id}", produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public boolean deletePatient(@PathVariable int id) throws MissingParameterException, InvalidParameterException {
		return service.deletePatient(id);
	}

}
