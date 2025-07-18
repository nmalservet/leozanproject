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
import com.leozanproject.resource.domain.SurveyDTO;
import com.leozanproject.resource.domain.SurveyFilterDTO;
import com.leozanproject.service.SurveyService;

/**
 * REST API for surveys
 * @author nicolas malservet
 *
 */
@RestController
@Validated
@RequestMapping("/api/v1/surveys")
public class SurveyResource {
	
	@Autowired
	SurveyService service;

	@GetMapping(path = "", produces = "application/json")
	public List<SurveyDTO> list() throws Exception {
		return service.list();
	}
	
	@PostMapping(path = "", produces = "application/json")
	@ResponseStatus(HttpStatus.CREATED)
	public boolean createSurvey(@RequestBody SurveyDTO dto) throws MissingParameterException, InvalidParameterException {
		return service.createSurvey(dto);
	}
	
	@GetMapping(path = "/{id}", produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public SurveyDTO getSurvey(@PathVariable int id) throws MissingParameterException {
		return service.getSurvey(id);
	}
	
	@PutMapping(path = "/{id}", produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public boolean updateSurvey(@PathVariable int id,@RequestBody SurveyDTO dto) throws MissingParameterException {
		return service.updateSurvey(dto);
	}

	@PostMapping(path = "/filter", produces = "application/json")
	public List<SurveyDTO> filter(@RequestBody SurveyFilterDTO filter) throws Exception {
		return service.filter(filter);
	}
	
	@DeleteMapping(path = "/{id}", produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public Boolean deleteSurvey(@PathVariable int id) throws MissingParameterException {
		return service.deleteSurvey(id);
	}
}
