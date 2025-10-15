package com.leozanproject.resource.domain;

import java.util.Date;

/**
 * dto to get the answers for a survey with the survey.
 * Used into the answers view.
 * @author nicolas malservet
 *
 */
public class AnswersInstanceDTO {
	
	Integer id;
	
	String uuid;
	
	/**
	 * label displayed with name and firstName
	 */
	String patientLabel;
	
	/**
	 * label displayed for the survey
	 */
	String surveyLabel;
	
	/**
	 * project name
	 */
	String project;

	String mrn;
	
	
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

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getPatientLabel() {
		return patientLabel;
	}

	public void setPatientLabel(String patientLabel) {
		this.patientLabel = patientLabel;
	}

	public String getMrn() {
		return mrn;
	}

	public void setMrn(String mrn) {
		this.mrn = mrn;
	}

	public String getSurveyLabel() {
		return surveyLabel;
	}

	public void setSurveyLabel(String surveyLabel) {
		this.surveyLabel = surveyLabel;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	
	
	
}
