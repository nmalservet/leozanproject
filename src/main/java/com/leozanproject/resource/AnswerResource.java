package com.leozanproject.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leozanproject.exceptions.InvalidParameterException;
import com.leozanproject.resource.domain.AnswerFilterDTO;
import com.leozanproject.resource.domain.AnswersInstanceDTO;
import com.leozanproject.resource.domain.SurveyAnswersDTO;
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
	public Integer save(@RequestBody SurveyAnswersDTO answers) throws InvalidParameterException {
		//TODO fetch the user id linked to the token
		int userId=1;
		return service.save(answers,userId);
	}
	
	@PutMapping(path = "", produces = "application/json")
	public Boolean update(@RequestBody SurveyAnswersDTO answers) {
		//TODO fetch the user id linked to the token
		int userId=1;
		return service.update(answers,userId);
	}
	
	@PostMapping(path = "/filter", produces = "application/json")
	public List<AnswersInstanceDTO> list(@RequestBody AnswerFilterDTO filter) {

		return service.list(filter);
	}

}
