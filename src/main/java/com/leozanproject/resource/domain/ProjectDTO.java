package com.leozanproject.resource.domain;

public class ProjectDTO {

	int id;

	String name;

	String description;

	int status;

	String statusLabel;

	boolean disabled;

	int responsible;

	String responsibleUsername;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getStatusLabel() {
		return statusLabel;
	}

	public void setStatusLabel(String statusLabel) {
		this.statusLabel = statusLabel;
	}

	public ProjectDTO() {

	}

	public ProjectDTO(String name) {
		this.name = name;
	}

	public ProjectDTO(int id, String name, String description) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
	}

	public boolean isDisabled() {
		return disabled;
	}

	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}

	public int getResponsible() {
		return responsible;
	}

	public void setResponsible(int responsible) {
		this.responsible = responsible;
	}

	public String getResponsibleUsername() {
		return responsibleUsername;
	}

	public void setResponsibleUsername(String responsibleUsername) {
		this.responsibleUsername = responsibleUsername;
	}

}
