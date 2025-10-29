package com.leozanproject.resource.domain;

import java.time.LocalDate;
import java.util.List;

/**
 * response object to fetch answers + patient + survey
 * @author nicolas malservet
 *
 */
public class SurveyResponse {
	
	int id;
	
	PatientDTO patient;
	
	SurveyDTO survey;
	
	LocalDate updateDate;
	
	List<SurveyObjectDTO> surveyObjects;
	
	List<AnswerDTO> answers;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public PatientDTO getPatient() {
		return patient;
	}

	public void setPatient(PatientDTO patient) {
		this.patient = patient;
	}

	public SurveyDTO getSurvey() {
		return survey;
	}

	public void setSurvey(SurveyDTO survey) {
		this.survey = survey;
	}

	public List<AnswerDTO> getAnswers() {
		return answers;
	}

	public void setAnswers(List<AnswerDTO> answers) {
		this.answers = answers;
	}

	public LocalDate getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(LocalDate updateDate) {
		this.updateDate = updateDate;
	}

	public List<SurveyObjectDTO> getSurveyObjects() {
		return surveyObjects;
	}

	public void setSurveyObjects(List<SurveyObjectDTO> surveyObjects) {
		this.surveyObjects = surveyObjects;
	}
	
	

}
