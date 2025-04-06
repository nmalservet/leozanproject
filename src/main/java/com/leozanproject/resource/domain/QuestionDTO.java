package com.leozanproject.resource.domain;

public class QuestionDTO {

	private Integer id;
	
	private String type;
	
	private String name;
	
	private Integer surveyObjectId;
	
	private Integer translationId;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getSurveyObjectId() {
		return surveyObjectId;
	}

	public void setSurveyObjectId(Integer surveyObjectId) {
		this.surveyObjectId = surveyObjectId;
	}

	public Integer getTranslationId() {
		return translationId;
	}

	public void setTranslationId(Integer translationId) {
		this.translationId = translationId;
	}
	
	
}
