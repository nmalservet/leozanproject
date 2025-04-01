package com.leozanproject.exceptions;

/**
 * Exception thrown when we have an invalid parameter provided.
 * 
 * @author nicolas malservet
 *
 */
public class InvalidParameterException extends Exception {

	private static final long serialVersionUID = 1L;
	String parameter;

	/**
	 * 
	 */

	public InvalidParameterException(String parameter) {
		this.parameter = parameter;
	}

	public String getParameter() {
		return parameter;
	}

	public void setParameter(String parameter) {
		this.parameter = parameter;
	}

}
