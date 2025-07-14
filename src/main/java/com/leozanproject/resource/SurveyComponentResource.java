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

import com.leozanproject.exceptions.BusinessRuleValidationException;
import com.leozanproject.exceptions.InvalidParameterException;
import com.leozanproject.exceptions.MissingParameterException;
import com.leozanproject.resource.domain.SurveyObjectDTO;
import com.leozanproject.service.SurveyObjectService;

import io.swagger.annotations.Api;
/**
 * API to manage survey objects
 * @author nicolas malservet
 *
 */
@Api(value = "Application")
@RestController
@Validated
@RequestMapping("/api/v1/surveycomponents")
public class SurveyComponentResource {

	@Autowired
	SurveyObjectService service;
	
	/**
	 * survey objects ordered bw position
	 * @param surveyId
	 * @return
	 * @throws Exception
	 */
	@GetMapping(path = "/{surveyId}", produces = "application/json")
	public List<SurveyObjectDTO> list(@PathVariable int surveyId) throws Exception {
		return service.list(surveyId);
	}
	
	@PostMapping(path = "", produces = "application/json")
	@ResponseStatus(HttpStatus.CREATED)
	public int createSurvey(@RequestBody SurveyObjectDTO dto) throws MissingParameterException, BusinessRuleValidationException {
		return service.create(dto);
	}
	
	/**
	 * PUT is the verb for update
	 * @param task
	 * @return
	 * @throws MissingParameterException
	 * @throws InvalidParameterException
	 * @throws BusinessRuleValidationException 
	 */
	@PutMapping(path = "/{id}", produces = "application/json")
	public int update(@RequestBody SurveyObjectDTO so,@PathVariable int id) throws MissingParameterException, InvalidParameterException, BusinessRuleValidationException {
		if(id!=so.getId())
			throw new InvalidParameterException("Survey Object id uncompliant");
		return service.update(so);
	}

	@DeleteMapping(path = "/{id}", produces = "application/json")
	public boolean delete(@PathVariable int id) throws MissingParameterException, InvalidParameterException {
		return service.delete(id);
	}
}
