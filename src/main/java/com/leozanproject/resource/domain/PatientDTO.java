package com.leozanproject.resource.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class PatientDTO {
	
	/**
	 * for API calls id is equal to uuid to protect the data with a scanning attack on id
	 */
	String id;
	
	
	String uuid;
	
	String name;
	
	String firstName;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", locale = "fr-FR", timezone = "Europe/Luxembourg")
	Date birthdate;
	
	/**
	 * encoded with HL7 Values.
	 */
	String gender;

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	
	public Date getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(Date birthdate) {
		this.birthdate = birthdate;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	

}
