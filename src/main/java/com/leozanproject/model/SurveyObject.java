package com.leozanproject.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 
 * survey object is a part of a survey to display some data <br>
 * type can be : 0 = text, 1=question <br>
 * style can be a string corresponding to an html style : h1, h2, h3, label etc.
 * 
 * @author nicolas malservet
 *
 */
@Entity
@Table(name = "survey_object")
public class SurveyObject {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@Column(name = "name")
	private String name;

	/**
	 * 0= question, 1=text
	 */
	@Column(name = "type")
	private Integer type;
	
	/**
	 * if the object is of type question
	 */
	@Column(name = "question_type")
	private Integer questionType;

	@Column(name = "style")
	private String style;
	
	@Column(name = "translationId")
	private Integer translationId;
	
	@Column(name = "surveyId")
	private Integer surveyId;
	
	@Column(name = "status")
	private Integer status;

	@Column(name = "position")
	private Integer position;
	
	/**
	 * values provided in case of select list, array of string separated by ;
	 */
	@Column(name = "values")
	private String values;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public Integer getTranslationId() {
		return translationId;
	}

	public void setTranslationId(Integer translationId) {
		this.translationId = translationId;
	}

	public Integer getSurveyId() {
		return surveyId;
	}

	public void setSurveyId(Integer surveyId) {
		this.surveyId = surveyId;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getPosition() {
		return position;
	}

	public void setPosition(Integer position) {
		this.position = position;
	}

	public Integer getQuestionType() {
		return questionType;
	}

	public void setQuestionType(Integer questionType) {
		this.questionType = questionType;
	}

	public String getValues() {
		return values;
	}

	public void setValues(String values) {
		this.values = values;
	}
	
	

}
