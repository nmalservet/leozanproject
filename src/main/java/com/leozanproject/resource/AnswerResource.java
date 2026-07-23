package com.leozanproject.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.leozanproject.service.SurveyResponsePdfService;

@RestController
@Validated
@RequestMapping("/api/v1/answers")
public class AnswerResource {

	@Autowired
	AnswerService service;

	@Autowired
	SurveyResponsePdfService pdfService;

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
	
	/**
	 * delete the survey response
	 *
	 */
	@DeleteMapping(path="/{id}", produces = "application/json")
	public Boolean deleteSurveyResponse(@PathVariable int id) {
		return service.deleteSurveyResponse(id);
	}

	/**
	 * export a survey response (questionnaire answers) as a PDF document.
	 */
	@GetMapping(path = "/{id}/pdf", produces = "application/pdf")
	public ResponseEntity<byte[]> exportPdf(@PathVariable int id) throws Exception {
		SurveyResponse response = service.getSurveyResponse(id);
		byte[] pdf = pdfService.generate(response);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_PDF);
		headers.setContentDisposition(ContentDisposition.attachment().filename("survey-response-" + id + ".pdf").build());
		return new ResponseEntity<>(pdf, headers, HttpStatus.OK);
	}

}
