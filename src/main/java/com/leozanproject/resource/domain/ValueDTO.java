package com.leozanproject.resource.domain;

/**
 * DTO to store a value linked to a question.
 * @author nicolas malservet
 *
 */
public class ValueDTO {
	
	Integer id;

	String name;

	Integer position;

	Integer questionId;

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

	public Integer getPosition() {
		return position;
	}

	public void setPosition(Integer position) {
		this.position = position;
	}

	public Integer getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Integer questionId) {
		this.questionId = questionId;
	}
	
	

}
