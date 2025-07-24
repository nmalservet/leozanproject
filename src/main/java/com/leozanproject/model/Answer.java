package com.leozanproject.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Stores the answer provided bw the user linked to a question.
 * 
 * @author nicolas malservet
 *
 */
@Entity
@Table(name = "answer")
public class Answer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@Column(name = "value")
	private String value;


	@Column(name = "survey_object_id")
	private Integer surveyObjectId;
	
	@Column(name = "survey_answer_id")
	private Integer surveyAnswerId;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	

	public Integer getSurveyObjectId() {
		return surveyObjectId;
	}

	public void setSurveyObjectId(Integer surveyObjectId) {
		this.surveyObjectId = surveyObjectId;
	}

	public Integer getSurveyAnswerId() {
		return surveyAnswerId;
	}

	public void setSurveyAnswerId(Integer surveyAnswerId) {
		this.surveyAnswerId = surveyAnswerId;
	}

	/**
	 * empty constructor for reflection.
	 */
	public Answer() {
		
	}
	
	public Answer(int surveyAnswerId, int surveyObjectId, String value) {
		this.surveyAnswerId=surveyAnswerId;
		this.surveyObjectId=surveyObjectId;
		this.value=value;
		
	}
	
	
	
}
