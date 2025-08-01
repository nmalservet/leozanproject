package com.leozanproject.resource.domain;

/**
 * atomic answer for a question/surveyObject
 * @author nicolas malservet
 *
 */
public class AnswerDTO {
	
	/**
	 * component of the survey id.
	 */
	int surveyComponentId;
	
	/**
	 * answer provided
	 */
	String value;

	public int getSurveyComponentId() {
		return surveyComponentId;
	}

	public void setSurveyComponentId(int surveyComponentId) {
		this.surveyComponentId = surveyComponentId;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	
	

}
