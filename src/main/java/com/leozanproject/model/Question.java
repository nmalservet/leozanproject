package com.leozanproject.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * question to store the meta-model of surveys.
 * @author nicolas malservet
 *
 */
@Entity
@Table(name = "question")
public class Question {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "type")
	private String type;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "survey_object_id")
	private Integer surveyObjectId;
	
	@Column(name = "translation_id")
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
