package com.leozanproject.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leozanproject.resource.domain.SurveyDTO;
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

}
