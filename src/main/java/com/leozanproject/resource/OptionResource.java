package com.leozanproject.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leozanproject.resource.domain.SelectListOptionDTO;
import com.leozanproject.service.SelectListService;

/**
 * options resources.
 * @author nicolas malservet
 *
 */
@RestController
@Validated
@RequestMapping("/api/v1/patients")
public class OptionResource {

	@Autowired
	SelectListService service;
	
	public List<SelectListOptionDTO> getSurveyStatuses(){
		return service.getSurveyStatuses();
	}
}
