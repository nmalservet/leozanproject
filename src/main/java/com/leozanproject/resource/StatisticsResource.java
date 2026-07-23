package com.leozanproject.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leozanproject.resource.domain.ResponsesByProjectAndMonthDTO;
import com.leozanproject.resource.domain.ResponsesByProjectDTO;
import com.leozanproject.service.StatisticsService;

@RestController
@Validated
@RequestMapping("/api/v1/statistics")
public class StatisticsResource {

	@Autowired
	StatisticsService service;

	/**
	 * number of responses saved per project, per month.
	 */
	@GetMapping(path = "/responsesByProject", produces = "application/json")
	public List<ResponsesByProjectAndMonthDTO> getResponsesByProjectOverTime() {
		return service.getResponsesByProjectOverTime();
	}

	/**
	 * total number of responses saved per project, all time.
	 */
	@GetMapping(path = "/surveysFilledByProject", produces = "application/json")
	public List<ResponsesByProjectDTO> getSurveysFilledByProject() {
		return service.getResponsesByProject();
	}

}
