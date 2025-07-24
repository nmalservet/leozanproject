package com.leozanproject.resource.domain;

import java.util.Date;
import java.util.List;

/**
 * dto for answsers on a survey
 * @author nicolas malservet
 *
 */
public class SurveyAnswersDTO {
	
	int id;

	int surveyId;
	
	String patientUuid;
	
	Date updateDate;
	
	List<AnswerDTO> answers;

	public int getSurveyId() {
		return surveyId;
	}

	public void setSurveyId(int surveyId) {
		this.surveyId = surveyId;
	}


	public String getPatientUuid() {
		return patientUuid;
	}

	public void setPatientUuid(String patientUuid) {
		this.patientUuid = patientUuid;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public List<AnswerDTO> getAnswers() {
		return answers;
	}

	public void setAnswers(List<AnswerDTO> answers) {
		this.answers = answers;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	
	
	
	
}
