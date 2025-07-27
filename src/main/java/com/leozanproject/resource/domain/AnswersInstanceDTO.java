package com.leozanproject.resource.domain;

import java.util.Date;

/**
 * dto to get the answers for a survey with the survey.
 * Used into the answers view.
 * @author nicolas malservet
 *
 */
public class AnswersInstanceDTO {

	PatientDTO patient;
	
	SurveyDTO survey;
	
	/**
	 * last date when the answers has been edited
	 */
	Date updateDate;
	
	/**
	 * unique id of the answers
	 */
	int surveyAnswersId;

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

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public int getSurveyAnswersId() {
		return surveyAnswersId;
	}

	public void setSurveyAnswersId(int surveyAnswersId) {
		this.surveyAnswersId = surveyAnswersId;
	}
	
	
}
