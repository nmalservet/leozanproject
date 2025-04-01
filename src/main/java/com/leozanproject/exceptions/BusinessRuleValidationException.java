package com.leozanproject.exceptions;

/**
 * Custom exception thrown when a business rule is borken.
 * 
 * @author nicolas malservet
 *
 */
public class BusinessRuleValidationException extends Exception {

	private static final long serialVersionUID = 1L;
	/**
	 * 
	 */
	String message;

	public BusinessRuleValidationException(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
