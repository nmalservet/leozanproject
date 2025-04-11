package com.leozanproject.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leozanproject.resource.domain.SelectListOptionDTO;
import com.leozanproject.resource.domain.SurveyDTO;
import com.leozanproject.service.SelectListService;

/**
 * options resources.
 * @author nicolas malservet
 *
 */
@RestController
@Validated
@RequestMapping("/api/v1/options")
public class OptionResource {

	@Autowired
	SelectListService service;
	
	@GetMapping(path = "/surveyStatuses", produces = "application/json")
	public List<SelectListOptionDTO> getSurveyStatuses(){
		return service.getSurveyStatuses();
	}
}
