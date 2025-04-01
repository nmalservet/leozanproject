package com.leozanproject.resource.domain;

/***
 * User ACcount DTO for requests and responses.
 * 
 * @author nicolas malservet
 *
 */
public class UserAccountDTO {

	private int id;
	/**
	 * username used to be authenticated.
	 */
	private String username;

	private String name;

	private String firstName;

	/**
	 * email used for the user
	 */
	private String email;

	private String password;

	private int role;
	
	private String roleLabel;
	
	private boolean disabled;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	

	public int getRole() {
		return role;
	}

	public void setRole(int role) {
		this.role = role;
	}

	public String getRoleLabel() {
		return roleLabel;
	}

	public void setRoleLabel(String roleLabel) {
		this.roleLabel = roleLabel;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String toLiteral() {
		return this.getFirstName() + " " + this.getName();
	}

	public boolean isDisabled() {
		return disabled;
	}

	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}
	
	

}
