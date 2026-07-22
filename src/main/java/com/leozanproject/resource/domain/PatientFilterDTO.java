package com.leozanproject.resource.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class PatientFilterDTO {

	String name;

	String firstName;

	String ssn;

	String mrn;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", locale = "fr-FR", timezone = "Europe/Luxembourg")
	Date birthdateFrom;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", locale = "fr-FR", timezone = "Europe/Luxembourg")
	Date birthdateTo;

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

	public String getSsn() {
		return ssn;
	}

	public void setSsn(String ssn) {
		this.ssn = ssn;
	}

	public String getMrn() {
		return mrn;
	}

	public void setMrn(String mrn) {
		this.mrn = mrn;
	}

	public Date getBirthdateFrom() {
		return birthdateFrom;
	}

	public void setBirthdateFrom(Date birthdateFrom) {
		this.birthdateFrom = birthdateFrom;
	}

	public Date getBirthdateTo() {
		return birthdateTo;
	}

	public void setBirthdateTo(Date birthdateTo) {
		this.birthdateTo = birthdateTo;
	}

}
