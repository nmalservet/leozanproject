package com.leozanproject.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leozanproject.exceptions.InvalidParameterException;
import com.leozanproject.resource.domain.AnswerFilterDTO;
import com.leozanproject.resource.domain.AnswersInstanceDTO;
import com.leozanproject.resource.domain.SurveyAnswersRequestDTO;
import com.leozanproject.resource.domain.SurveyResponse;
import com.leozanproject.service.AnswerService;

import io.swagger.annotations.Api;

@Api(value = "Application")
@RestController
@Validated
@RequestMapping("/api/v1/answers")
public class AnswerResource {
	
	@Autowired
	AnswerService service;
	
	/**
	 * save answers
	 * @param answers
	 * @return
	 * @throws InvalidParameterException 
	 */
	@PostMapping(path = "", produces = "application/json")
	public Integer save(@RequestBody SurveyAnswersRequestDTO answers) throws InvalidParameterException {
		//TODO fetch the user id linked to the token
		int userId=1;
		return service.save(answers,userId);
	}
	
	@PutMapping(path = "", produces = "application/json")
	public Boolean update(@RequestBody SurveyAnswersRequestDTO answers) {
		//TODO fetch the user id linked to the token
		int userId=1;
		return service.update(answers,userId);
	}
	
	@PostMapping(path = "/filter", produces = "application/json")
	public List<AnswersInstanceDTO> list(@RequestBody AnswerFilterDTO filter) {

		return service.list(filter);
	}
	@GetMapping(path="/{id}", produces = "application/json")
	public SurveyResponse getSurveyResponse(@PathVariable int id) {
		return service.getSurveyResponse(id);
	}

}
